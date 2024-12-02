const { models } = require('../models')
const { Op } = require('sequelize')

class TagService {
  static async createTag(tag) {
    try {
      const existingTag = await models.Tag.findOne({
        where: { name: tag.name },
      })

      if (existingTag) {
        const error = new Error('Tag already exists')
        error.status = 409
        throw error
      }
      const data = await models.Tag.create({
        name: tag.name,
      })
      return data
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getTagList({ page = 1, pageSize = 10, search = '' }) {
    try {
      const offset = (page - 1) * pageSize
      const where = search ? { name: { [Op.like]: `%${search}%` } } : {}
      const { count, rows } = await models.Tag.findAndCountAll({
        where,
        offset,
        limit: parseInt(pageSize, 10),
        order: [['id', 'DESC']],
      })
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: Number(page),
        tags: rows,
      }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteTag(id) {
    try {
      const tag = await models.Tag.findByPk(id)
      if (!tag) {
        const error = new Error('Tag not found')
        error.status = 404
        throw error
      }
      await tag.destroy()
      return { message: 'Tag deleted successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteTags(ids) {
    try {
      const tags = await models.Tag.findAll({ where: { id: ids } })
      if (tags.length !== ids.length) {
        const error = new Error('One or more tags not found')
        error.status = 404
        throw error
      }
      await models.Tag.destroy({ where: { id: ids } })
      return { message: 'Tags deleted successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateTag(id, updatedData) {
    try {
      const tag = await models.Tag.findByPk(id)
      if (!tag) {
        const error = new Error('Tag not found')
        error.status = 404
        throw error
      }
      const updatedTag = await tag.update({
        name: updatedData.name,
      })
      return updatedTag
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = TagService
