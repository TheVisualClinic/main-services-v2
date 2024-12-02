const BaseAboutSectionService = require('../services/base-about-section.services')
const ResponseHandle = require('../utils/responseHandle')

class BaseAboutSectionController {
  static async getSectionDetail(req, res) {
    try {
      const result = await BaseAboutSectionService.getSectionDetail()
      return ResponseHandle.success(res, result, 'Successfully retrieved the section')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateSectionDetail(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body

      const result = await BaseAboutSectionService.updateSectionDetail(id, updatedData)

      return ResponseHandle.success(res, result, 'Successfully updated the section')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = BaseAboutSectionController
