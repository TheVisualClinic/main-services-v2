const PageReviewsService = require('../services/page-reviews.services')
const ResponseHandle = require('../utils/responseHandle')

class PageReviewsController {
  static async getPageReviewsDetail(req, res) {
    try {
      const result = await PageReviewsService.getPageReviewsDetail()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePageReviewsDetail(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body

      const result = await PageReviewsService.updatePageReviewsDetail(id, updatedData)

      return ResponseHandle.success(res, result, 'Successfully updated the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getGroupList(req, res) {
    try {
      const { reviewPageId } = req.params

      const result = await PageReviewsService.getGroupList(reviewPageId)

      return ResponseHandle.success(res, result, 'Successfully retrieved the group list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getReviewsList(req, res) {
    try {
      const { groupId } = req.params

      const result = await PageReviewsService.getReviewsList(groupId)

      return ResponseHandle.success(res, result, 'Successfully retrieved the reviews list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async createGroup(req, res) {
    try {
      const { reviewPageId } = req.params

      const result = await PageReviewsService.createGroup(reviewPageId)

      return ResponseHandle.success(res, result, 'Group created successfully')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateGroup(req, res) {
    try {
      const { groupId } = req.params
      const updatedData = req.body

      const result = await PageReviewsService.updateGroup(groupId, updatedData)

      return ResponseHandle.success(res, result, 'Successfully updated the group')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderGroup(req, res) {
    try {
      const { groupId } = req.params
      const { newOrder } = req.body

      const result = await PageReviewsService.reorderGroup(groupId, newOrder)

      return ResponseHandle.success(res, result, 'Successfully reordered the group')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteGroup(req, res) {
    try {
      const { groupId } = req.params

      const result = await PageReviewsService.deleteGroup(groupId)

      return ResponseHandle.success(res, result, 'Successfully deleted the group')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async createGroupItem(req, res) {
    try {
      const { groupId } = req.params

      const result = await PageReviewsService.createGroupItem(groupId)

      return ResponseHandle.success(res, result, 'Group item created successfully')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateGroupItem(req, res) {
    try {
      const { itemId } = req.params
      const updatedData = req.body

      const result = await PageReviewsService.updateGroupItem(itemId, updatedData)

      return ResponseHandle.success(res, result, 'Successfully updated the group item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderGroupItem(req, res) {
    try {
      const { itemId } = req.params
      const { newOrder } = req.body

      const result = await PageReviewsService.reorderGroupItem(itemId, newOrder)

      return ResponseHandle.success(res, result, 'Successfully reordered the group item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteGroupItem(req, res) {
    try {
      const { itemId } = req.params

      const result = await PageReviewsService.deleteGroupItem(itemId)

      return ResponseHandle.success(res, result, 'Successfully deleted the group item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = PageReviewsController
