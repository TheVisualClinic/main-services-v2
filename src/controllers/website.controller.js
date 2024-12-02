const WebsiteService = require('../services/website.services')
const ResponseHandle = require('../utils/responseHandle')

class WebsiteController {
  static async getFooterData(req, res) {
    try {
      const result = await WebsiteService.getFooterData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getContactPageData(req, res) {
    try {
      const result = await WebsiteService.getContactPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getReviewsPageData(req, res) {
    try {
      const result = await WebsiteService.getReviewsPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getReviewsBannerData(req, res) {
    try {
      const result = await WebsiteService.getReviewsBannerData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  //  เดี๋ยวกลับมาทำ
  static async getReviewList(req, res) {
    try {
      const result = await WebsiteService.getReviewList()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getBlogsPageData(req, res) {
    try {
      const result = await WebsiteService.getBlogsPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getSocialBannerData(req, res) {
    try {
      const result = await WebsiteService.getSocialBannerData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = WebsiteController
