const { models } = require('../models')

class BaseSocialSectionService {
  static async getSectionDetail() {
    try {
      const sectionDetail = await models.BaseSocialSection.findOne()

      if (!sectionDetail) {
        const error = new Error('No Base Social Section found')
        error.status = 404
        throw error
      }

      return sectionDetail
    } catch (error) {
      throw error
    }
  }

  static async updateSectionDetail(id, updatedData) {
    try {
      const section = await models.BaseSocialSection.findOne({ where: { id } })

      if (!section) {
        const error = new Error(`Base Social Section with ID ${id} not found`)
        error.status = 404
        throw error
      }

      await section.update(updatedData)

      return section
    } catch (error) {
      throw error
    }
  }
}

module.exports = BaseSocialSectionService
