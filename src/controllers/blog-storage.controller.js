const BlogStorageService = require('../services/blog-storage.services')
const ResponseHandle = require('../utils/responseHandle')

class BlogImgStorageControllerV2 {
  static async getBlogStorage(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10
      const search = req.query.searchQuery || ''
      const blogImgList = await BlogStorageService.getBlogStorage(page, pageSize, search)
      ResponseHandle.success(res, blogImgList, 'Blog list retrieved successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }

  static async createImage(req, res) {
    try {
      const accessToken = req.accessToken
      const image_file = req.file
      const { image_name } = req.body

      if ((!image_file, !image_name)) {
        return ResponseHandle.error(res, 400, 'image_file and image_name is required')
      }

      const blogImage = await BlogStorageService.createImage(req, accessToken)
      ResponseHandle.success(res, blogImage, 'Blog image created successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }

  static async updateNewImageName(req, res) {
    try {
      const { storage_id, new_image_name } = req.body
      if (!storage_id || !new_image_name) {
        return ResponseHandle.error(res, 400, 'storage_id and new_image_name is required')
      }
      const updatedBlogImg = await BlogStorageService.updateNewImageName(storage_id, new_image_name)
      ResponseHandle.success(res, updatedBlogImg, 'New Image name updated successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }

  static async deleteImage(req, res) {
    try {
      const accessToken = req.accessToken
      const { id: storage_id } = req.params
      if (!storage_id) {
        return ResponseHandle.error(res, 400, 'storage_id is required')
      }
      const result = await BlogStorageService.deleteImage(storage_id, accessToken)
      ResponseHandle.success(res, result, 'Image deleted successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }
}

module.exports = BlogImgStorageControllerV2
