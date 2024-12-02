const TagService = require('../services/tag.services')
const ResponseHandle = require('../utils/responseHandle')

class TagController {
  static async getTagList(req, res) {
    try {
      const { page = 1, pageSize = 10, search = '' } = req.query
      const tagList = await TagService.getTagList({ page, pageSize, search })
      ResponseHandle.success(res, tagList, 'Tag list retrieved successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async createTag(req, res) {
    try {
      const { name } = req.body

      if (!name) {
        return ResponseHandle.error(res, 400, 'Tag name is required')
      }
      const newTag = await TagService.createTag({ name })
      ResponseHandle.success(res, newTag, 'Tag created successfully')
    } catch (error) {
      const errorMessage = error.message || 'Internal Server Error'
      ResponseHandle.error(res, error.status || 500, errorMessage)
    }
  }

  static async updateTag(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        return ResponseHandle.error(res, 400, 'Tag name is required')
      }

      const updatedTag = await TagService.updateTag(id, { name })
      ResponseHandle.success(res, updatedTag, 'Tag updated successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async deleteTag(req, res) {
    try {
      const { id } = req.params
      const deleteResult = await TagService.deleteTag(id)
      ResponseHandle.success(res, deleteResult, 'Tag deleted successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async deleteTags(req, res) {
    try {
      const { ids } = req.body
      if (!Array.isArray(ids) || ids.length === 0) {
        return ResponseHandle.error(res, 400, 'Tag IDs are required')
      }
      const deleteResult = await TagService.deleteTags(ids)
      ResponseHandle.success(res, deleteResult, 'Tags deleted successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }
}

module.exports = TagController
