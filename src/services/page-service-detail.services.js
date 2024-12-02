const { models } = require('../models')
const { Op } = require('sequelize')

class PageServiceDetailService {
  static async getServiceDetail(service_id) {
    try {
      const service = await models.Service.findByPk(service_id)

      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      return {
        id: service.id,
        slug_th: service.slug_th,
        slug_en: service.slug_en,
        category_id: service.category_id,
        header_image_id: service.header_image_id,
        header_image_url: service.header_image_url,
        cover_image_id: service.cover_image_id,
        cover_image_url: service.cover_image_url,
        service_name_th: service.service_name_th,
        service_name_en: service.service_name_en,
        service_price: service.service_price,
        cover_description_th: service.cover_description_th,
        cover_description_en: service.cover_description_en,
        status: service.status,
        public_at: service.public_at,
        created_at: service.created_at,
        updated_at: service.updated_at,
      }
    } catch (error) {
      throw error
    }
  }

  static async updateServiceStatus(service_id, new_status) {
    try {
      const service = await models.Service.findByPk(service_id)
      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      const updateData = { status: new_status }
      if (new_status === 'public') {
        updateData.public_at = new Date()
      }
      await service.update(updateData)
      return 'Service Status updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateHeaderImage(service_id, header_image_id, header_image_url) {
    try {
      const service = await models.Service.findByPk(service_id)
      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      await service.update({
        header_image_id,
        header_image_url,
      })

      return 'Header Image updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateCoverImage(service_id, cover_image_id, cover_image_url) {
    try {
      const service = await models.Service.findByPk(service_id)
      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      await service.update({
        cover_image_id,
        cover_image_url,
      })

      return 'Cover Image updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateSlug(service_id, new_slug_th, new_slug_en) {
    try {
      const slugFormat = (slug) => {
        return slug
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9ก-๙\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      }
      const formattedSlugTh = slugFormat(new_slug_th)
      const formattedSlugEn = slugFormat(new_slug_en)

      const existingServiceWithSlug = await models.Service.findOne({
        where: { slug_th: formattedSlugTh, slug_th: formattedSlugEn },
      })
      if (existingServiceWithSlug) {
        const error = new Error('Slug is already in use')
        error.status = 409
        throw error
      }

      const service = await models.Service.findByPk(service_id)
      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      service.slug_th = formattedSlugTh
      service.slug_en = formattedSlugEn
      await service.save()
      return service
    } catch (error) {
      throw error
    }
  }

  static async updateSetting(service_id, category_id = null) {
    try {
      const service = await models.Service.findByPk(service_id)
      if (!service) {
        throw new Error(`Service with ID "${service_id}" not found`)
      }

      if (category_id) {
        service.category_id = category_id
        await service.save()
      }

      return {
        message: 'Category updated successfully',
        category: category_id || null,
      }
    } catch (error) {
      throw error
    }
  }

  static async updateTitle(
    service_id,
    service_name_th,
    service_name_en,
    service_price,
    cover_description_th,
    cover_description_en
  ) {
    try {
      const service = await models.Service.findByPk(service_id)
      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      await service.update({
        service_name_th,
        service_name_en,
        service_price,
        cover_description_th,
        cover_description_en,
      })

      return 'Service Title updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async getServicePreview(slug) {
    try {
      const service = await models.Service.findOne({
        where: { [Op.or]: [{ slug_th: slug }, { slug_en: slug }] },
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
        const error = new Error(`Service with slug "${slug}" not found`)
        error.status = 404
        throw error
      }

      let formattedContents = []
      try {
        formattedContents = service.service_content.map((content) => {
          const formattedContent = {
            service_content_id: content.id,
            content_type: content.content_type,
            order: content.order,
          }
          if (content.content_type === 'TEXT') {
            formattedContent.content_id = content.service_text_content?.id || null
            formattedContent.text_th = content.service_text_content?.text_th || null
            formattedContent.text_en = content.service_text_content?.text_en || null
            formattedContent.type = content.service_text_content?.type || null
          } else if (content.content_type === 'IMAGE') {
            formattedContent.content_id = content.service_image_content?.id || null
            formattedContent.image_id = content.service_image_content?.image_id || null
            formattedContent.image_url = content.service_image_content?.image_url || null
            formattedContent.alt_text_th = content.service_image_content?.alt_text_th || null
            formattedContent.alt_text_en = content.service_image_content?.alt_text_en || null
            formattedContent.image_2_id = content.service_image_content?.image_2_id || null
            formattedContent.image_2_url = content.service_image_content?.image_2_url || null
            formattedContent.alt_2_text_th = content.service_image_content?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.service_image_content?.alt_2_text_en || null
            formattedContent.image_3_id = content.service_image_content?.image_3_id || null
            formattedContent.image_3_url = content.service_image_content?.image_3_url || null
            formattedContent.alt_3_text_th = content.service_image_content?.alt_3_text_th || null
            formattedContent.alt_3_text_en = content.service_image_content?.alt_3_text_en || null
            formattedContent.type = content.service_image_content?.type || null
          }
          return formattedContent
        })
      } catch (error) {
        throw error
      }

      const faqs = await models.PageServiceFaq.findAll({
        attributes: ['faq_order', 'title_th', 'title_en', 'description_th', 'description_en'],
        where: {
          service_id: service.id,
        },
        order: [['faq_order', 'ASC']],
      })

      return {
        id: service.id,
        service_name_th: service.service_name_th,
        service_name_en: service.service_name_en,
        header_image_id: service.header_image_id,
        header_image_url: service.header_image_url,
        contents: formattedContents,
        faq_list: faqs,
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = PageServiceDetailService
