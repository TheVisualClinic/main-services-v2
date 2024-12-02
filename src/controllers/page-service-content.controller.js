const PageServiceContentService = require('../services/page-service-content.services')
const ResponseHandle = require('../utils/responseHandle')

class PageServiceContentController {
  static async getServiceContent(req, res) {
    try {
      const { service_id } = req.params
      if (!service_id) {
        return ResponseHandle.error(res, 400, 'Service ID is required')
      }

      const result = await PageServiceContentService.getServiceContent(service_id)
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

  static async createServiceContent(req, res) {
    try {
      const { service_id, content_type, order, type } = req.body
      if (!service_id || !content_type || !order || !type) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await PageServiceContentService.createServiceContent(
        service_id,
        content_type,
        order,
        type
      )
      ResponseHandle.success(res, result, 'Service content created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteServiceContent(req, res) {
    try {
      const { service_content_id } = req.params
      const { service_id } = req.body
      if (!service_content_id || !service_id) {
        return ResponseHandle.error(res, 400, 'Service content ID and Service ID is required')
      }

      const result = await PageServiceContentService.deleteServiceContent(
        service_content_id,
        service_id
      )
      ResponseHandle.success(res, result, 'Service content deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateOrderContent(req, res) {
    try {
      const { service_id, service_content_id, new_order } = req.body
      if (!service_id || !service_content_id || !new_order) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await PageServiceContentService.updateOrderContent(
        service_id,
        service_content_id,
        new_order
      )
      ResponseHandle.success(res, result, 'Service content successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateTextContent(req, res) {
    try {
      const { service_content_id, content_id, text_th, text_en } = req.body
      if (!service_content_id || !content_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await PageServiceContentService.updateTextContent(
        service_content_id,
        content_id,
        text_th,
        text_en
      )
      ResponseHandle.success(res, result, 'Service content successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateImageContent(req, res) {
    try {
      const {
        service_content_id,
        content_id,
        image_id,
        image_url,
        alt_text_th,
        alt_text_en,
        image_2_id,
        image_2_url,
        alt_2_text_th,
        alt_2_text_en,
        image_3_id,
        image_3_url,
        alt_3_text_th,
        alt_3_text_en,
      } = req.body
      if (!service_content_id || !content_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await PageServiceContentService.updateImageContent(
        service_content_id,
        content_id,
        image_id,
        image_url,
        alt_text_th,
        alt_text_en,
        image_2_id,
        image_2_url,
        alt_2_text_th,
        alt_2_text_en,
        image_3_id,
        image_3_url,
        alt_3_text_th,
        alt_3_text_en
      )
      ResponseHandle.success(res, result, 'Service content successfully')
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

module.exports = PageServiceContentController
