const PageStorageService = require('../services/page-storage.services')
const ResponseHandle = require('../utils/responseHandle')

class PageStorageController {
  static async getPageStorage(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10
      const search = req.query.searchQuery || ''
      const pageImgList = await PageStorageService.getPageStorage(page, pageSize, search)
      ResponseHandle.success(res, pageImgList, 'Page image list retrieved successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }

  static async createImage(req, res) {
    try {
      const image_file = req.file
      const { image_name } = req.body

      if ((!image_file, !image_name)) {
        return ResponseHandle.error(res, 400, 'image_file and image_name is required')
      }

      const pageImage = await PageStorageService.createImage(req)
      ResponseHandle.success(res, pageImage, 'Page image created successfully')
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
        return ResponseHandle.error(res, 400, 'storage_id and new_image_name are required')
      }
      const updatedPageImg = await PageStorageService.updateNewImageName(storage_id, new_image_name)
      ResponseHandle.success(res, updatedPageImg, 'Image name updated successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }

  static async deleteImage(req, res) {
    try {
      const { id: storage_id } = req.params
      if (!storage_id) {
        return ResponseHandle.error(res, 400, 'storage_id is required')
      }
      const result = await PageStorageService.deleteImage(storage_id)
      ResponseHandle.success(res, result, 'Image deleted successfully')
    } catch (error) {
      if (error.status >= 500) {
        ResponseHandle.error(res, error.status, 'Internal Server Error')
      }
      ResponseHandle.error(res, error.status, 'Fail', error)
    }
  }
}

module.exports = PageStorageController
