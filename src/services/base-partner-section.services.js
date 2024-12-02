const { models } = require('../models')

class BasePartnerSectionService {
  static async getSectionDetail() {
    try {
      const sectionDetail = await models.BasePartnerSection.findOne()

      if (!sectionDetail) {
        const error = new Error('No Base Partner Section found')
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
      const section = await models.BasePartnerSection.findOne({ where: { id } })

      if (!section) {
        const error = new Error(`Base Partner Section with ID ${id} not found`)
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

module.exports = BasePartnerSectionService
