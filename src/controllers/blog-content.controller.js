const BlogContentService = require('../services/blog-content.services')
const ResponseHandle = require('../utils/responseHandle')

class BlogContentController {
  static async getBlogContent(req, res) {
    try {
      const { blog_id } = req.params
      if (!blog_id) {
        return ResponseHandle.error(res, 400, 'Blog ID is required')
      }

      const result = await BlogContentService.getBlogContent(blog_id)
      ResponseHandle.success(res, result, 'Blog list retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createBlogContent(req, res) {
    try {
      const { blog_id, content_type, order, type } = req.body
      if (!blog_id || !content_type || !order || !type) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogContentService.createBlogContent(blog_id, content_type, order, type)
      ResponseHandle.success(res, result, 'Blog content created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteBlogContent(req, res) {
    try {
      const { blog_content_id } = req.params
      const { blog_id } = req.body
      if (!blog_content_id || !blog_id) {
        return ResponseHandle.error(res, 400, 'Blog content ID and Blog ID is required')
      }

      const result = await BlogContentService.deleteBlogContent(blog_content_id, blog_id)
      ResponseHandle.success(res, result, 'Blog content deleted successfully')
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
      const { blog_id, blog_content_id, new_order } = req.body
      if (!blog_id || !blog_content_id || !new_order) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogContentService.updateOrderContent(
        blog_id,
        blog_content_id,
        new_order
      )
      ResponseHandle.success(res, result, 'Blog content successfully')
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
      const { blog_content_id, content_id, text_th, text_en } = req.body
      if (!blog_content_id || !content_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogContentService.updateTextContent(
        blog_content_id,
        content_id,
        text_th,
        text_en
      )
      ResponseHandle.success(res, result, 'Blog content successfully')
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
        blog_content_id,
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
      if (!blog_content_id || !content_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogContentService.updateImageContent(
        blog_content_id,
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
      ResponseHandle.success(res, result, 'Blog content successfully')
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

module.exports = BlogContentController
