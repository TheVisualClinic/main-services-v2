const BlogStorageService = require('../services/blogStorage.services')
const ResponseHandle = require('../utils/responseHandle')

class BlogStorageController {
  static async getImageList(req, res) {
    try {
      const page = isNaN(parseInt(req.query.page)) ? 1 : parseInt(req.query.page)
      const pageSize = isNaN(parseInt(req.query.pageSize)) ? 10 : parseInt(req.query.pageSize)

      const images = await BlogStorageService.getImageList(page, pageSize)
      ResponseHandle.success(res, images)
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getImageById(req, res) {
    try {
      const { image_id } = req.params

      if (!image_id) {
        return ResponseHandle.error(res, 400, 'image_id is required!')
      }

      const image = await BlogStorageService.getImageById(image_id)
      ResponseHandle.success(res, image)
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async uploadImage(req, res) {
    try {
      const { file } = req
      const { file_name } = req.body

      if (!file || !file_name) {
        return ResponseHandle.error(res, 400, 'Please upload an image and provide file_name!')
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
      if (!allowedTypes.includes(file.mimetype)) {
        return ResponseHandle.error(
          res,
          400,
          'Invalid image type. Allowed types: jpg, jpeg, png, bmp, webp, heif, heic.'
        )
      }

      const uploadedBy = req.user.userId
      const image = await BlogStorageService.uploadImage(file, file_name, uploadedBy)
      ResponseHandle.success(res, image, 'Image uploaded successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async uploadMultipleImages(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return ResponseHandle.error(res, 400, 'Please upload at least one image!')
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
      for (const file of req.files) {
        if (!allowedTypes.includes(file.mimetype)) {
          return ResponseHandle.error(
            res,
            400,
            'Invalid image type. Allowed types: jpg, jpeg, png, bmp, webp, heif, heic.'
          )
        }
      }

      const uploadedBy = req.user.userId
      const images = await BlogStorageService.uploadMultipleImages(req.files, uploadedBy)
      ResponseHandle.success(res, images, 'Images uploaded successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
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

      await BlogStorageService.deleteImage(image_id)
      ResponseHandle.success(res, null, 'Image permanently deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteMultipleImages(req, res) {
    try {
      const { image_ids } = req.body

      if (!image_ids || !Array.isArray(image_ids) || image_ids.length === 0) {
        return ResponseHandle.error(res, 400, 'image_ids array is required!')
      }

      await BlogStorageService.deleteMultipleImages(image_ids)
      ResponseHandle.success(res, null, 'Images permanently deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }
}

module.exports = BlogStorageController
