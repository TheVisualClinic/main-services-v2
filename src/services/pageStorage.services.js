const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const { models } = require('../models')

class PageStorageService {
  static async getImageById(image_id) {
    try {
      const image = await models.PageStorage.findByPk(image_id)
      if (!image) {
        const error = new Error('Image not found')
        error.status = 404
        throw error
      }
      return image
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

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

  static async getImageList(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize

      const { count, rows: images } = await models.PageStorage.findAndCountAll({
        limit,
        offset,
      })

      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        images,
      }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async uploadImage(imageFile, file_name, uploadedBy) {
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
      if (!error.status) error.status = 500
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
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteImage(image_id) {
    return this._deleteSingleImage(image_id)
  }

  static async deleteMultipleImages(image_ids) {
    try {
      const deletePromises = image_ids.map((image_id) => this._deleteSingleImage(image_id))
      await Promise.all(deletePromises)
      return { message: 'Images deleted successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
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
