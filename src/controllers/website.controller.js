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

  static async getLastPromotions(req, res) {
    try {
      const result = await WebsiteService.getLastPromotions()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getAboutOurServices(req, res) {
    try {
      const result = await WebsiteService.getAboutOurServices()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getBlogTagsList(req, res) {
    try {
      const result = await WebsiteService.getBlogTagsList()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getBlogList(req, res) {
    try {
      const { search = '', limit = 12, offset = 0 } = req.query

      const result = await WebsiteService.getBlogList(
        search.toString(),
        parseInt(limit, 10),
        parseInt(offset, 10)
      )

      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getBlogDetailBySlug(req, res) {
    try {
      const { slug } = req.body
      if (!slug) {
        return ResponseHandle.error(res, 400, 'Slug is required')
      }

      const result = await WebsiteService.getBlogDetailBySlug(slug)
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getLastArticle(req, res) {
    try {
      const { notSlug = '', limit = 8 } = req.body

      const result = await WebsiteService.getLastArticle(notSlug, limit)
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPromotionsPageData(req, res) {
    try {
      const result = await WebsiteService.getPromotionsPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getCaptionBannerData(req, res) {
    try {
      const result = await WebsiteService.getCaptionBannerData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPromotionsList(req, res) {
    try {
      const result = await WebsiteService.getPromotionsList()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getHomePageData(req, res) {
    try {
      const result = await WebsiteService.getHomePageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getAboutBannerData(req, res) {
    try {
      const result = await WebsiteService.getAboutBannerData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getServicesList(req, res) {
    try {
      const result = await WebsiteService.getServicesList()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getDoctorList(req, res) {
    try {
      const result = await WebsiteService.getDoctorList()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getServicesPageData(req, res) {
    try {
      const result = await WebsiteService.getServicesPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPartnerBannerData(req, res) {
    try {
      const result = await WebsiteService.getPartnerBannerData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getAboutUsPageData(req, res) {
    try {
      const result = await WebsiteService.getAboutUsPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getMedicalTeamPageData(req, res) {
    try {
      const result = await WebsiteService.getMedicalTeamPageData()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getDoctorDetailList(req, res) {
    try {
      const result = await WebsiteService.getDoctorDetailList()
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
