const PageHomeService = require('../services/page-home.services')
const ResponseHandle = require('../utils/responseHandle')

class PageHomeController {
  static async getDetail(req, res) {
    try {
      const result = await PageHomeService.getDetail()
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

      const result = await PageHomeService.updateDetail(id, updatedData)

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

module.exports = PageHomeController
