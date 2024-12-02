const PageServiceListService = require('../services/page-service-list.services')
const ResponseHandle = require('../utils/responseHandle')

class PageServiceListController {
  static async getServiceList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10
      const search = req.query.search || ''
      const category_id = req.query.category_id ? parseInt(req.query.category_id) : null

      const result = await PageServiceListService.getServiceList(
        page,
        pageSize,
        search,
        category_id
      )
      ResponseHandle.success(res, result, 'Service list retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createDraftService(req, res) {
    try {
      const result = await PageServiceListService.createDraftService()
      ResponseHandle.success(res, result, 'Draft service created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteServiceById(req, res) {
    try {
      const { service_id } = req.params
      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceListService.deleteServiceById(service_id)
      ResponseHandle.success(res, result, 'Blog deleted successfully')
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

module.exports = PageServiceListController
