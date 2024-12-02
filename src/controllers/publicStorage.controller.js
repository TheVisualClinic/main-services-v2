const PublicStorageService = require('../services/publicStorage.services')
const ResponseHandle = require('../utils/responseHandle')

class PublicStorageController {
  static async getImageList(req, res) {
    try {
      const images = await PublicStorageService.getImageList()
      ResponseHandle.success(res, images)
    } catch (error) {
      ResponseHandle.error(res, 500, 'Internal Server Error', error)
    }
  }

  static async uploadImage(req, res) {
    try {
      if (!req.file) {
        return ResponseHandle.error(res, 400, 'Please upload an image!')
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/webp',
        'image/heif',
        'image/heic',
      ]
      if (!allowedTypes.includes(req.file.mimetype)) {
        return ResponseHandle.error(
          res,
          400,
          'Invalid image type. Only jpg, jpeg, png, bmp, webp, heif, and heic are allowed.'
        )
      }

      const image = await PublicStorageService.uploadImage(req.file)
      ResponseHandle.success(res, image, 'Image uploaded successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status >= 400 && error.status < 500 ? error.status : 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteImage(req, res) {
    try {
      const { image_id } = req.body

      if (!image_id) {
        return ResponseHandle.error(res, 400, 'image_id is required!')
      }

      await PublicStorageService.deleteImage(image_id)
      ResponseHandle.success(res, null, 'Image permanently deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status >= 400 && error.status < 500 ? error.status : 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }
}

module.exports = PublicStorageController
