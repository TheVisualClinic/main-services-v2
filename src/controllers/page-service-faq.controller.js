const PageServiceFaqService = require('../services/page-service-faq.services')
const ResponseHandle = require('../utils/responseHandle')

class PageServiceFaqController {
  static async getServiceFaq(req, res) {
    try {
      const { service_id } = req.params

      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceFaqService.getServiceFaq(service_id)
      ResponseHandle.success(res, result, 'Service FAQs retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createFaq(req, res) {
    try {
      const { service_id } = req.body

      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceFaqService.createFaq(service_id)
      ResponseHandle.success(res, result, 'Empty FAQ created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateFaq(req, res) {
    try {
      const { id } = req.params
      const { title_th, title_en, description_th, description_en } = req.body

      if (!id) {
        return ResponseHandle.error(res, 400, 'FAQ ID is required')
      }

      const result = await PageServiceFaqService.updateFaq(id, {
        title_th,
        title_en,
        description_th,
        description_en,
      })

      ResponseHandle.success(res, result, 'FAQ updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteFaq(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return ResponseHandle.error(res, 400, 'FAQ ID is required')
      }

      const result = await PageServiceFaqService.deleteFaq(id)

      ResponseHandle.success(res, result, 'FAQ deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async reorderFaq(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body

      if (!id || newOrder === undefined) {
        return ResponseHandle.error(res, 400, 'FAQ ID and new order are required')
      }

      const result = await PageServiceFaqService.reorderFaq(id, newOrder)

      ResponseHandle.success(res, result, 'FAQ reordered successfully')
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

module.exports = PageServiceFaqController
