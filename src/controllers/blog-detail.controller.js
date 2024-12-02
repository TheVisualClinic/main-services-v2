const BlogDetailService = require('../services/blog-detail.services')
const ResponseHandle = require('../utils/responseHandle')

class BlogDetailController {
  static async getBlogDetail(req, res) {
    try {
      const user_id = req.user.userId
      const { blog_id } = req.params
      if ((!blog_id, !user_id)) {
        return ResponseHandle.error(res, 400, 'Blog ID and Access Token is required')
      }

      const result = await BlogDetailService.getBlogDetail(user_id, blog_id)
      ResponseHandle.success(res, result, 'Blog detail retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateBlogStatus(req, res) {
    const { blog_id } = req.params
    const { status } = req.body
    if (!blog_id || !status) {
      return ResponseHandle.error(res, 400, 'Blog ID and Status is required')
    }

    try {
      const result = await BlogDetailService.updateBlogStatus(blog_id, status)
      ResponseHandle.success(res, result, 'Blog status updated successfully')
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
      const { blog_id } = req.params
      const { header_image_id, header_image_url } = req.body
      if (!blog_id || !header_image_id || !header_image_url) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogDetailService.updateHeaderImage(
        blog_id,
        header_image_id,
        header_image_url
      )
      ResponseHandle.success(res, result, 'Blog Detail updated successfully')
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
      const { blog_id } = req.params
      const { cover_image_id, cover_image_url } = req.body
      if (!blog_id || !cover_image_id || !cover_image_url) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogDetailService.updateCoverImage(
        blog_id,
        cover_image_id,
        cover_image_url
      )
      ResponseHandle.success(res, result, 'Blog Detail updated successfully')
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
      const { blog_id } = req.params
      const { new_slug_th, new_slug_en } = req.body
      if (!blog_id || !new_slug_th || !new_slug_en) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogDetailService.updateSlug(blog_id, new_slug_th, new_slug_en)
      ResponseHandle.success(res, result, 'Blog Detail updated successfully')
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
      const { blog_id } = req.params
      const { tag_names = [], category_id = null } = req.body

      if (!blog_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogDetailService.updateSetting(blog_id, tag_names, category_id)
      ResponseHandle.success(res, result, 'Blog Detail updated successfully')
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
      const { blog_id } = req.params
      const {
        title_th,
        title_en,
        description_th,
        description_en,
        time_to_read,
        author_fullname,
        author_nickname,
        author_description,
        author_url,
      } = req.body

      if (!blog_id) {
        return ResponseHandle.error(res, 400, 'Body is required')
      }

      const result = await BlogDetailService.updateTitle(
        blog_id,
        title_th,
        title_en,
        description_th,
        description_en,
        time_to_read,
        author_fullname,
        author_nickname,
        author_description,
        author_url
      )
      ResponseHandle.success(res, result, 'Blog Detail updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getBlogPreview(req, res) {
    try {
      const { slug } = req.params
      const user_id = req.user.userId

      if (!slug) {
        return res.status(400).json({
          message: 'Slug is required',
        })
      }

      const result = await BlogDetailService.getBlogPreview(user_id, slug)
      ResponseHandle.success(res, result, 'Blog preview retrieved successfully')
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

module.exports = BlogDetailController
