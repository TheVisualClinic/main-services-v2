const { models } = require('../models')

class PageHomeService {
  static async getDetail() {
    try {
      const detail = await models.PageHome.findOne()

      if (!detail) {
        const error = new Error('Data not found')
        error.status = 404
        throw error
      }

      return detail
    } catch (error) {
      throw error
    }
  }

  static async updateDetail(id, updatedData) {
    try {
      const detail = await models.PageHome.findOne({ where: { id } })

      if (!detail) {
        const error = new Error(`Data not found`)
        error.status = 404
        throw error
      }

      await detail.update(updatedData)

      return detail
    } catch (error) {
      throw error
    }
  }
}

module.exports = PageHomeService
