const { models, sequelize } = require('../models')
const { Op } = require('sequelize')

class PageServiceContentService {
  static async getServiceContent(service_id) {
    try {
      const service = await models.Service.findByPk(service_id, {
        include: [
          {
            model: models.ServiceContent,
            as: 'service_content',
            include: [
              { model: models.ServiceTextContent, as: 'service_text_content' },
              { model: models.ServiceImageContent, as: 'service_image_content' },
            ],
          },
        ],
        order: [[{ model: models.ServiceContent, as: 'service_content' }, 'order', 'ASC']],
      })

      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      const formattedContents = service.service_content.map((content) => {
        const baseContent = {
          service_content_id: content.id,
          content_type: content.content_type,
          order: content.order,
        }

        if (content.content_type === 'TEXT') {
          return {
            ...baseContent,
            content_id: content.service_text_content?.id || null,
            text_th: content.service_text_content?.text_th || null,
            text_en: content.service_text_content?.text_en || null,
            type: content.service_text_content?.type || null,
          }
        } else if (
          content.content_type === 'IMAGE' &&
          content.service_image_content?.type === 'image'
        ) {
          return {
            ...baseContent,
            content_id: content.service_image_content?.id || null,
            image_id: content.service_image_content?.image_id || null,
            image_url: content.service_image_content?.image_url || null,
            alt_text_th: content.service_image_content?.alt_text_th || null,
            alt_text_en: content.service_image_content?.alt_text_en || null,
            type: content.service_image_content?.type || null,
          }
        } else if (
          content.content_type === 'IMAGE' &&
          content.service_image_content?.type === 'image-2'
        ) {
          return {
            ...baseContent,
            content_id: content.service_image_content?.id || null,
            image_id: content.service_image_content?.image_id || null,
            image_url: content.service_image_content?.image_url || null,
            alt_text_th: content.service_image_content?.alt_text_th || null,
            alt_text_en: content.service_image_content?.alt_text_en || null,
            image_2_id: content.service_image_content?.image_2_id || null,
            image_2_url: content.service_image_content?.image_2_url || null,
            alt_2_text_th: content.service_image_content?.alt_2_text_th || null,
            alt_2_text_en: content.service_image_content?.alt_2_text_en || null,
            type: content.service_image_content?.type || null,
          }
        } else if (
          content.content_type === 'IMAGE' &&
          content.service_image_content?.type === 'image-3'
        ) {
          return {
            ...baseContent,
            content_id: content.service_image_content?.id || null,
            image_id: content.service_image_content?.image_id || null,
            image_url: content.service_image_content?.image_url || null,
            alt_text_th: content.service_image_content?.alt_text_th || null,
            alt_text_en: content.service_image_content?.alt_text_en || null,
            image_2_id: content.service_image_content?.image_2_id || null,
            image_2_url: content.service_image_content?.image_2_url || null,
            alt_2_text_th: content.service_image_content?.alt_2_text_th || null,
            alt_2_text_en: content.service_image_content?.alt_2_text_en || null,
            image_3_id: content.service_image_content?.image_3_id || null,
            image_3_url: content.service_image_content?.image_3_url || null,
            alt_3_text_th: content.service_image_content?.alt_3_text_th || null,
            alt_3_text_en: content.service_image_content?.alt_3_text_en || null,
            type: content.service_image_content?.type || null,
          }
        } else {
          console.warn(`Unsupported content type: ${content.content_type}`)
          return baseContent
        }
      })

      return formattedContents
    } catch (error) {
      throw error
    }
  }

  static async createServiceContent(service_id, content_type, order, type) {
    try {
      const serviceContent = await models.ServiceContent.create({
        service_id,
        content_type,
        order,
      })
      if (content_type === 'TEXT') {
        await models.ServiceTextContent.create({
          service_content_id: serviceContent.id,
          service_id: service_id,
          type,
          text_th: type === 'bullet' || type === 'numbered' ? '[EMPTY]' : null,
          text_en: type === 'bullet' || type === 'numbered' ? '[EMPTY]' : null,
        })
      } else if (content_type === 'IMAGE') {
        await models.ServiceImageContent.create({
          service_content_id: serviceContent.id,
          service_id: service_id,
          type,
        })
      }
      return serviceContent
    } catch (error) {
      throw error
    }
  }

  static async deleteServiceContent(service_content_id, service_id) {
    const transaction = await sequelize.transaction()
    try {
      const content = await models.ServiceContent.findOne({
        where: {
          id: service_content_id,
          service_id: service_id,
        },
        transaction,
      })

      if (!content) {
        const error = new Error('Content not found or does not belong to the specified service')
        error.status = 404
        throw error
      }

      const deletedOrder = content.order

      await content.destroy({ transaction })

      await models.ServiceContent.update(
        { order: sequelize.literal('`order` - 1') },
        {
          where: {
            service_id: service_id,
            order: { [Op.gt]: deletedOrder },
          },
          transaction,
        }
      )

      await transaction.commit()
      return 'Deleted and order updated successfully'
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static async updateOrderContent(service_id, service_content_id, new_order) {
    try {
      const item = await models.ServiceContent.findOne({
        where: {
          id: service_content_id,
          service_id: service_id,
        },
      })

      if (!item) {
        const error = new Error('Content not found')
        error.status = 404
        throw error
      }

      const old_order = item.order

      if (old_order < new_order) {
        await models.ServiceContent.update(
          { order: sequelize.literal('`order` - 1') },
          {
            where: {
              service_id: service_id,
              order: {
                [Op.gt]: old_order,
                [Op.lte]: new_order,
              },
            },
          }
        )
      } else if (old_order > new_order) {
        await models.ServiceContent.update(
          { order: sequelize.literal('`order` + 1') },
          {
            where: {
              service_id: service_id,
              order: {
                [Op.gte]: new_order,
                [Op.lt]: old_order,
              },
            },
          }
        )
      }

      item.order = new_order
      await item.save()

      return 'Order updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateTextContent(service_content_id, content_id, text_th, text_en) {
    try {
      const textContent = await models.ServiceTextContent.findOne({
        where: {
          id: content_id,
          service_content_id: service_content_id,
        },
      })

      if (!textContent) {
        const error = new Error('TextContent not found')
        error.status = 404
        throw error
      }

      await textContent.update({
        text_th: text_th || textContent.text_th,
        text_en: text_en || textContent.text_en,
      })

      return 'Text content updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateImageContent(
    service_content_id,
    content_id,
    image_id,
    image_url,
    alt_text_th,
    alt_text_en,
    image_2_id,
    image_2_url,
    alt_2_text_th,
    alt_2_text_en,
    image_3_id,
    image_3_url,
    alt_3_text_th,
    alt_3_text_en
  ) {
    try {
      const imageContent = await models.ServiceImageContent.findOne({
        where: {
          id: content_id,
          service_content_id: service_content_id,
        },
      })

      if (!imageContent) {
        const error = new Error('ImageContent not found')
        error.status = 404
        throw error
      }

      const updateData = {}
      if (image_id !== undefined) updateData.image_id = image_id
      if (image_url !== undefined) updateData.image_url = image_url
      if (alt_text_th !== undefined) updateData.alt_text_th = alt_text_th
      if (alt_text_en !== undefined) updateData.alt_text_en = alt_text_en
      if (image_2_id !== undefined) updateData.image_2_id = image_2_id
      if (image_2_url !== undefined) updateData.image_2_url = image_2_url
      if (alt_2_text_th !== undefined) updateData.alt_2_text_th = alt_2_text_th
      if (alt_2_text_en !== undefined) updateData.alt_2_text_en = alt_2_text_en
      if (image_3_id !== undefined) updateData.image_3_id = image_3_id
      if (image_3_url !== undefined) updateData.image_3_url = image_3_url
      if (alt_3_text_th !== undefined) updateData.alt_3_text_th = alt_3_text_th
      if (alt_3_text_en !== undefined) updateData.alt_3_text_en = alt_3_text_en

      await imageContent.update(updateData)

      return 'Image content updated successfully'
    } catch (error) {
      throw error
    }
  }
}

module.exports = PageServiceContentService
