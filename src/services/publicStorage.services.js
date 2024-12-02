const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { models } = require('../models')

class PublicStorageService {
  static sanitizeFileName(fileName) {
    return fileName
      .replace(/[^a-zA-Z0-9ก-ฮะ-์._-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
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

  static async getImageList() {
    try {
      const images = await models.PublicStorage.findAll()
      return images
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async uploadImage(imageFile) {
    try {
      const uploadsDir = 'src/uploads'
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const dir = path.join(uploadsDir, 'public')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const originalFileName = path.parse(imageFile.originalname).name
      const sanitizedFileName = this.sanitizeFileName(originalFileName)

      const fileExtension = imageFile.mimetype === 'image/png' ? 'png' : 'webp'
      const imageName = `${sanitizedFileName}.${fileExtension}`
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

      const imageUrl = `/storage/${imageName}`
      const newImage = await models.PublicStorage.create({
        image_url: imageUrl,
        image_path: imagePath,
      })

      return newImage
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteImage(image_id) {
    try {
      const image = await models.PublicStorage.findByPk(image_id)
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

module.exports = PublicStorageService
