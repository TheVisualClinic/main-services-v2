const PageServiceDetailService = require('../services/page-service-detail.services')
const ResponseHandle = require('../utils/responseHandle')

class PageServiceDetailController {
  static async getServiceDetail(req, res) {
    try {
      const { service_id } = req.params

      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceDetailService.getServiceDetail(service_id)
      ResponseHandle.success(res, result, 'Service detail retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateServiceStatus(req, res) {
    try {
      const { service_id } = req.params
      const { status } = req.body

      if (!service_id || !status) {
        return ResponseHandle.error(res, 400, 'Service ID and Status are required')
      }

      const result = await PageServiceDetailService.updateServiceStatus(service_id, status)
      ResponseHandle.success(res, result, 'Service status updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateHeaderImage(req, res) {
    try {
      const { service_id } = req.params
      const { header_image_id, header_image_url } = req.body

      if (!service_id || !header_image_id || !header_image_url) {
        return ResponseHandle.error(res, 400, 'Service ID, Header Image ID, and URL are required')
      }

      const result = await PageServiceDetailService.updateHeaderImage(
        service_id,
        header_image_id,
        header_image_url
      )
      ResponseHandle.success(res, result, 'Header image updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateCoverImage(req, res) {
    try {
      const { service_id } = req.params
      const { cover_image_id, cover_image_url } = req.body

      if (!service_id || !cover_image_id || !cover_image_url) {
        return ResponseHandle.error(res, 400, 'Service ID, Cover Image ID, and URL are required')
      }

      const result = await PageServiceDetailService.updateCoverImage(
        service_id,
        cover_image_id,
        cover_image_url
      )
      ResponseHandle.success(res, result, 'Cover image updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateSlug(req, res) {
    try {
      const { service_id } = req.params
      const { new_slug_th, new_slug_en } = req.body

      if (!service_id || !new_slug_th || !new_slug_en) {
        return ResponseHandle.error(res, 400, 'Service ID and Slugs are required')
      }

      const result = await PageServiceDetailService.updateSlug(service_id, new_slug_th, new_slug_en)
      ResponseHandle.success(res, result, 'Slug updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateSetting(req, res) {
    try {
      const { service_id } = req.params
      const { category_id = null } = req.body

      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceDetailService.updateSetting(service_id, category_id)
      ResponseHandle.success(res, result, 'Service setting updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateTitle(req, res) {
    try {
      const { service_id } = req.params
      const {
        service_name_th,
        service_name_en,
        service_price,
        cover_description_th,
        cover_description_en,
      } = req.body

      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceDetailService.updateTitle(
        service_id,
        service_name_th,
        service_name_en,
        service_price,
        cover_description_th,
        cover_description_en
      )
      ResponseHandle.success(res, result, 'Service title updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getServicePreview(req, res) {
    try {
      const { slug } = req.params

      if (!slug) {
        return ResponseHandle.error(res, 400, 'Slug is required')
      }

      const result = await PageServiceDetailService.getServicePreview(slug)
      ResponseHandle.success(res, result, 'Service preview retrieved successfully')
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

module.exports = PageServiceDetailController
