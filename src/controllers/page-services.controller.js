const PageServicesService = require('../services/page-services.services')
const ResponseHandle = require('../utils/responseHandle')

class PageServicesController {
  static async getDetail(req, res) {
    try {
      const result = await PageServicesService.getDetail()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateDetail(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body

      const result = await PageServicesService.updateDetail(id, updatedData)

      return ResponseHandle.success(res, result, 'Successfully updated the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = PageServicesController
