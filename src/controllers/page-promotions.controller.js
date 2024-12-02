const PagePromotionsService = require('../services/page-promotions.services')
const ResponseHandle = require('../utils/responseHandle')

class PagePromotionsController {
  static async getPagePromotionsDetail(req, res) {
    try {
      const result = await PagePromotionsService.getPagePromotionsDetail()
      return ResponseHandle.success(res, result, 'Successfully retrieved the promotion details')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePagePromotionsDetail(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PagePromotionsService.updatePagePromotionsDetail(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the promotion details')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPromotionList(req, res) {
    try {
      const { pagePromotionsId } = req.params
      const accessToken = req.accessToken
      const result = await PagePromotionsService.getPromotionList(pagePromotionsId, accessToken)
      return ResponseHandle.success(res, result, 'Successfully retrieved the promotion list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPromotionDetail(req, res) {
    try {
      const { promotionId } = req.params
      const accessToken = req.accessToken
      const result = await PagePromotionsService.getPromotionDetail(promotionId, accessToken)
      return ResponseHandle.success(res, result, 'Successfully retrieved the promotion detail')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async createPromotionItem(req, res) {
    try {
      const { pagePromotionsId } = req.params
      const createBy = req.user
      const result = await PagePromotionsService.createPromotionItem(pagePromotionsId, createBy)
      return ResponseHandle.success(res, result, 'Successfully created a promotion item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePromotionItem(req, res) {
    try {
      const { itemId } = req.params
      const updatedData = req.body
      const createBy = req.user
      const result = await PagePromotionsService.updatePromotionItem(itemId, updatedData, createBy)
      return ResponseHandle.success(res, result, 'Successfully updated the promotion item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderPromotionItem(req, res) {
    try {
      const { itemId } = req.params
      const { newOrder } = req.body
      const result = await PagePromotionsService.reorderPromotionItem(itemId, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the promotion item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deletePromotionItem(req, res) {
    try {
      const { itemId } = req.params
      const result = await PagePromotionsService.deletePromotionItem(itemId)
      return ResponseHandle.success(res, result, 'Successfully deleted the promotion item')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async createPromotionBenefit(req, res) {
    try {
      const { pagePromotionsItemId } = req.params
      const result = await PagePromotionsService.createPromotionBenefit(pagePromotionsItemId)
      return ResponseHandle.success(res, result, 'Successfully created a promotion benefit')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePromotionBenefit(req, res) {
    try {
      const { benefitId } = req.params
      const updatedData = req.body
      const result = await PagePromotionsService.updatePromotionBenefit(benefitId, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the promotion benefit')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderPromotionBenefit(req, res) {
    try {
      const { benefitId } = req.params
      const { newOrder } = req.body
      const result = await PagePromotionsService.reorderPromotionBenefit(benefitId, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the promotion benefit')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deletePromotionBenefit(req, res) {
    try {
      const { benefitId } = req.params
      const result = await PagePromotionsService.deletePromotionBenefit(benefitId)
      return ResponseHandle.success(res, result, 'Successfully deleted the promotion benefit')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = PagePromotionsController
