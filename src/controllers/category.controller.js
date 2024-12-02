const CategoryService = require('../services/category.services')
const ResponseHandle = require('../utils/responseHandle')

class CategoryController {
  static async getCategoryList(req, res) {
    try {
      const { page = 1, pageSize = 10, search = '' } = req.query
      const categoryList = await CategoryService.getCategoryList({ page, pageSize, search })
      ResponseHandle.success(res, categoryList, 'Category list retrieved successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async createCategory(req, res) {
    try {
      const { name_th, name_en } = req.body
      if (!name_th || !name_en) {
        return ResponseHandle.error(res, 400, 'Category name is required')
      }

      const newCategory = await CategoryService.createCategory({ name_th, name_en })
      ResponseHandle.success(res, newCategory, 'Category created successfully')
    } catch (error) {
      const errorMessage = error.message || 'Internal Server Error'
      ResponseHandle.error(res, error.status || 500, errorMessage)
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params
      const { name_th, name_en } = req.body
      if (!name_th || !name_en) {
        return ResponseHandle.error(res, 400, 'Category name is required')
      }

      const updatedCategory = await CategoryService.updateCategory(id, { name_th, name_en })
      ResponseHandle.success(res, updatedCategory, 'Category updated successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params
      const deleteResult = await CategoryService.deleteCategory(id)
      ResponseHandle.success(res, deleteResult, 'Category deleted successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }

  static async deleteCategories(req, res) {
    try {
      const { ids } = req.body
      if (!Array.isArray(ids) || ids.length === 0) {
        return ResponseHandle.error(res, 400, 'Category IDs are required')
      }
      const deleteResult = await CategoryService.deleteCategories(ids)
      ResponseHandle.success(res, deleteResult, 'Categories deleted successfully')
    } catch (error) {
      ResponseHandle.error(res, error.status || 500, 'Internal Server Error', error)
    }
  }
}

module.exports = CategoryController
