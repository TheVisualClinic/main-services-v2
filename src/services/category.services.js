const { models, Sequelize } = require('../models')
const { Op } = require('sequelize')

class CategoryService {
  static async createCategory(category) {
    try {
      const existingCategory = await models.Category.findOne({
        where: {
          [Op.or]: [{ name_th: category.name_th }, { name_en: category.name_en }],
        },
      })

      if (existingCategory) {
        const error = new Error('Category with the same name (TH or EN) already exists')
        error.status = 409
        throw error
      }

      const data = await models.Category.create({
        name_th: category.name_th,
        name_en: category.name_en,
      })
      return data
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getCategoryList({ page = 1, pageSize = 10, search = '' }) {
    try {
      const offset = Math.max(0, (page - 1) * pageSize)
      const where = search ? { name: { [Op.like]: `%${search}%` } } : {}
      const { count, rows } = await models.Category.findAndCountAll({
        where,
        offset,
        limit: parseInt(pageSize, 10),
        order: [['id', 'DESC']],
      })
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: Number(page),
        categories: rows,
      }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteCategory(id) {
    try {
      const category = await models.Category.findByPk(id)
      if (!category) {
        const error = new Error('Category not found')
        error.status = 404
        throw error
      }
      await category.destroy()
      return { message: 'Category deleted successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteCategories(ids) {
    try {
      const categories = await models.Category.findAll({
        where: { id: ids },
      })
      if (categories.length !== ids.length) {
        const error = new Error('One or more categories not found')
        error.status = 404
        throw error
      }
      await models.Category.destroy({
        where: { id: ids },
      })
      return { message: 'Categories deleted successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateCategory(id, updatedData) {
    try {
      const category = await models.Category.findByPk(id)
      if (!category) {
        const error = new Error('Category not found')
        error.status = 404
        throw error
      }

      const updatedCategory = await category.update({
        name_th: updatedData.name_th,
        name_en: updatedData.name_en,
      })

      return updatedCategory
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = CategoryService
