const { models } = require('../models')

class BaseCaptionSectionService {
  static async getSectionDetail() {
    try {
      const sectionDetail = await models.BaseCaptionSection.findOne()

      if (!sectionDetail) {
        const error = new Error('No Base Caption Section found')
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
      const section = await models.BaseCaptionSection.findOne({ where: { id } })

      if (!section) {
        const error = new Error(`Base Caption Section with ID ${id} not found`)
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

module.exports = BaseCaptionSectionService
