const BlogListService = require('../services/blog-list.services')
const ResponseHandle = require('../utils/responseHandle')

class BlogListController {
  static async getBlogList(req, res) {
    try {
      const accessToken = req.accessToken
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10
      const year = req.query.year ? parseInt(req.query.year) : null
      const search = req.query.search || ''

      const result = await BlogListService.getBloglist(accessToken, page, pageSize, year, search)
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

  static async createDraftBlog(req, res) {
    try {
      const user_id = req.user.userId

      if (!user_id) {
        return ResponseHandle.error(res, 400, 'User ID is required')
      }

      const result = await BlogListService.createDraftBlog(user_id)
      ResponseHandle.success(res, result, 'Draft blog created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteBlogById(req, res) {
    try {
      const { blog_id } = req.params
      if (!blog_id) {
        return ResponseHandle.error(res, 400, 'Blog ID is required')
      }
      const result = await BlogListService.deleteBlogById(blog_id)
      ResponseHandle.success(res, result, 'Blog deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getFilterYearsList(req, res) {
    try {
      const result = await BlogListService.getFilterYearsList()
      ResponseHandle.success(res, result, 'Filter Years list retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async duplicateBlog(req, res) {
    const { blog_id } = req.params
    const user_id = req.user.userId
    if ((!blog_id, !user_id)) {
      return ResponseHandle.error(res, 400, 'Blog ID and User ID is required')
    }

    try {
      const result = await BlogListService.duplicateBlog(blog_id, user_id)
      ResponseHandle.success(res, result, 'Blog duplicated successfully')
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

module.exports = BlogListController
