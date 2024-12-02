const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const { models } = require('../models')
const { Op } = require('sequelize')

class PageStorageService {
  static deleteEmptyDirectories(dir) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      if (files.length === 0) {
        fs.rmdirSync(dir)
        const parentDir = path.dirname(dir)
        this.deleteEmptyDirectories(parentDir)
      }
    }
  }

  static async getPageStorage(page = 1, pageSize = 10, search = '') {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize
      const whereCondition = search ? { image_name: { [Op.like]: `%${search}%` } } : {}

      const { count, rows: pagesImg } = await models.PageImgStorage.findAndCountAll({
        where: whereCondition,
        order: [['id', 'DESC']],
        offset,
        limit,
      })
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        pagesImg,
      }
    } catch (error) {
      throw error
    }
  }

  static async createImage(req, accessToken) {
    let uploadedImageId = null

    try {
      const { userId } = req.user
      const { file: imageFile } = req
      const { image_name: imageName } = req.body

      const response = await this._uploadImage(imageFile, imageName, userId)

      if (!response) {
        const error = new Error('Failed to upload image to storage provider')
        error.status = 404
        throw error
      }

      uploadedImageId = response.image_id

      const originalName = response.image_original_name
      const imageNameWithoutExtension = originalName.split('.').slice(0, -1).join('.')

      const imageData = {
        image_id: uploadedImageId,
        image_url: response.image_url,
        image_name: imageNameWithoutExtension,
      }
      const imagePage = await models.PageImgStorage.create(imageData)
      return imagePage
    } catch (error) {
      throw error
    }
  }

  static async _uploadImage(imageFile, file_name, uploadedBy) {
    return this._uploadSingleImage(imageFile, file_name, uploadedBy)
  }

  static async uploadMultipleImages(imageFiles, uploadedBy) {
    try {
      const uploadPromises = imageFiles.map((imageFile) =>
        this._uploadSingleImage(imageFile, uploadedBy)
      )
      const uploadedImages = await Promise.all(uploadPromises)
      return uploadedImages
    } catch (error) {
      throw error
    }
  }

  static async _uploadSingleImage(imageFile, file_name, uploadedBy) {
    try {
      const uploadsDir = 'src/uploads'
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const dir = path.join(uploadsDir, 'page')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const uniqueFileName = uuidv4()
      const imageName = `${uniqueFileName}.webp`
      const imagePath = path.join(dir, imageName)

      if (fs.existsSync(imagePath)) {
        const error = new Error('Image with the same name already exists.')
        error.status = 409
        throw error
      }

      const imageMetadata = await sharp(imageFile.buffer).metadata()

      await sharp(imageFile.buffer)
        .resize({
          width: imageMetadata.width,
          height: imageMetadata.height,
        })
        .webp({ quality: 90 })
        .toFile(imagePath)

      const imageUrl = `/storage/page/${imageName}`

      const newImage = await models.PageStorage.create({
        image_url: imageUrl,
        image_path: imagePath,
        image_original_name: file_name,
        image_type: imageFile.mimetype,
        image_size: imageFile.size,
        upload_by: uploadedBy,
      })

      return newImage
    } catch (error) {
      throw error
    }
  }

  static async updateNewImageName(id, new_image_name) {
    try {
      const pageImg = await models.PageImgStorage.findByPk(id)

      if (!pageImg) {
        const error = new Error('Page image not found')
        error.status = 404
        throw error
      }
      await pageImg.update({ image_name: new_image_name })
      return pageImg
    } catch (error) {
      throw error
    }
  }

  static async deleteImage(id) {
    try {
      const pageImg = await models.PageImgStorage.findByPk(id)
      if (!pageImg) {
        throw new Error('Page image not found')
      }

      await this._deleteImage(pageImg.image_id)
      await pageImg.destroy()
      return { message: 'Page image deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async _deleteImage(image_id) {
    return this._deleteSingleImage(image_id)
  }

  static async _deleteSingleImage(image_id) {
    try {
      const image = await models.PageStorage.findByPk(image_id)
      if (!image) {
        const error = new Error('Image not found')
        error.status = 404
        throw error
      }

      const imagePath = image.image_path
      const dirPath = path.dirname(imagePath)

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }

      await image.destroy({ force: true })

      this.deleteEmptyDirectories(dirPath)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = PageStorageService
