const PageBlogsService = require('../services/page-blogs.services')
const ResponseHandle = require('../utils/responseHandle')

class PageBlogsController {
  static async getDetail(req, res) {
    try {
      const result = await PageBlogsService.getDetail()
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

      const result = await PageBlogsService.updateDetail(id, updatedData)

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

module.exports = PageBlogsController
