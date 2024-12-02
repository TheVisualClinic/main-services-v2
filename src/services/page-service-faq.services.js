const { models, sequelize } = require('../models')
const { Op } = require('sequelize')

class PageServiceFaqService {
  static async getServiceFaq(service_id) {
    try {
      const faqs = await models.PageServiceFaq.findAll({
        where: {
          service_id: service_id,
        },
        order: [['faq_order', 'ASC']],
      })
      return faqs
    } catch (error) {
      throw error
    }
  }

  static async createFaq(service_id) {
    try {
      const maxOrder = await models.PageServiceFaq.max('faq_order', {
        where: { service_id },
      })

      const faq = await models.PageServiceFaq.create({
        service_id,
        faq_order: maxOrder ? maxOrder + 1 : 1,
        title_th: null,
        title_en: null,
        description_th: null,
        description_en: null,
      })

      return faq
    } catch (error) {
      throw error
    }
  }

  static async updateFaq(id, data) {
    try {
      const faq = await models.PageServiceFaq.findByPk(id)
      if (!faq) throw new Error('FAQ not found')
      await faq.update(data)
      return faq
    } catch (error) {
      throw error
    }
  }

  static async deleteFaq(id) {
    try {
      const faq = await models.PageServiceFaq.findByPk(id)
      if (!faq) throw new Error('FAQ not found')

      const service_id = faq.service_id
      const deletedOrder = faq.faq_order
      await faq.destroy()

      const remainingFaqs = await models.PageServiceFaq.count({
        where: { service_id },
      })

      if (remainingFaqs === 0) {
        return { message: 'FAQ deleted successfully' }
      }

      await models.PageServiceFaq.update(
        { faq_order: sequelize.literal('`faq_order` - 1') },
        {
          where: {
            service_id,
            faq_order: {
              [Op.gt]: deletedOrder,
            },
          },
        }
      )
      return { message: 'FAQ deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async reorderFaq(id, newOrder) {
    try {
      const faq = await models.PageServiceFaq.findByPk(id)
      if (!faq) throw new Error('FAQ not found')

      const service_id = faq.service_id
      const currentOrder = faq.faq_order

      if (newOrder === currentOrder) return faq

      if (newOrder > currentOrder) {
        await models.PageServiceFaq.update(
          { faq_order: sequelize.literal('`faq_order` - 1') },
          {
            where: {
              service_id,
              faq_order: {
                [Op.gt]: currentOrder,
                [Op.lte]: newOrder,
              },
            },
          }
        )
      } else if (newOrder < currentOrder) {
        await models.PageServiceFaq.update(
          { faq_order: sequelize.literal('`faq_order` + 1') },
          {
            where: {
              service_id,
              faq_order: {
                [Op.gte]: newOrder,
                [Op.lt]: currentOrder,
              },
            },
          }
        )
      }

      await faq.update({ faq_order: newOrder })
      return faq
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = PageServiceFaqService
