const PageAboutUsService = require('../services/page-about-us.services')
const ResponseHandle = require('../utils/responseHandle')

class PageAboutUsController {
  static async getDetail(req, res) {
    try {
      const result = await PageAboutUsService.getDetail()
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

      const result = await PageAboutUsService.updateDetail(id, updatedData)

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

module.exports = PageAboutUsController
