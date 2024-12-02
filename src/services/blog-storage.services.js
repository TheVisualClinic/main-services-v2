const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const { models } = require('../models')
const { Op } = require('sequelize')

const axios = require('axios')
const FormData = require('form-data')

class BlogStorageService {
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

  static async getBlogStorage(page = 1, pageSize = 10, search = '') {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize
      const whereCondition = search ? { image_name: { [Op.like]: `%${search}%` } } : {}

      const { count, rows: blogsImg } = await models.BlogImgStorage.findAndCountAll({
        where: whereCondition,
        order: [['id', 'DESC']],
        offset,
        limit,
      })
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        blogsImg,
      }
    } catch (error) {
      throw error
    }
  }

  static async createImage(req) {
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
      return await models.BlogImgStorage.create(imageData)
    } catch (error) {
      throw error
    }
  }

  static async _uploadImage(imageFile, fileName, uploadedBy) {
    return this._uploadSingleImage(imageFile, fileName, uploadedBy)
  }

  static async _uploadSingleImage(imageFile, fileName, uploadedBy) {
    try {
      const uploadsDir = path.resolve('src/uploads/blog')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const uniqueFileName = uuidv4()
      const imageName = `${uniqueFileName}.webp`
      const imagePath = path.join(uploadsDir, imageName)

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

      const imageUrl = `/storage/blog/${imageName}`

      return await models.BlogStorage.create({
        image_url: imageUrl,
        image_path: imagePath,
        image_original_name: fileName,
        image_type: imageFile.mimetype,
        image_size: imageFile.size,
        upload_by: uploadedBy,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateNewImageName(id, new_image_name) {
    try {
      const blogImg = await models.BlogImgStorage.findByPk(id)

      if (!blogImg) {
        const error = new Error('Blog image not found')
        error.status = 404
        throw error
      }
      await blogImg.update({ image_name: new_image_name })
      return blogImg
    } catch (error) {
      throw error
    }
  }

  static async deleteImage(id) {
    try {
      const blogImg = await models.BlogImgStorage.findByPk(id)
      if (!blogImg) {
        throw new Error('Blog image not found')
      }

      await this._deleteImage(blogImg.image_id)
      await blogImg.destroy()
      return { message: 'Blog image deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async _deleteImage(image_id) {
    return this._deleteSingleImage(image_id)
  }

  static async _deleteSingleImage(image_id) {
    try {
      const image = await models.BlogStorage.findByPk(image_id)
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

module.exports = BlogStorageService
