const { models } = require('../models')
const { Op } = require('sequelize')

class PageServiceListService {
  static async getServiceList(page, pageSize, search = '', category_id = null) {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize

      const whereCondition = this._buildWhereCondition(search, category_id)

      const { count, rows: services } = await models.Service.findAndCountAll({
        where: whereCondition,
        order: [['id', 'DESC']],
        offset,
        limit,
      })

      const categoryIds = services.map((service) => service.category_id).filter(Boolean)
      const categories = await models.Category.findAll({
        where: {
          id: {
            [Op.in]: categoryIds,
          },
        },
        attributes: ['id', 'name_th', 'name_en'],
      })

      const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category
        return acc
      }, {})

      const serviceList = services.map((service) => ({
        ...this._mapServiceToResponse(service),
        category_data: categoryMap[service.category_id] || null,
      }))

      const totalPages = Math.ceil(count / pageSize)

      return {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize,
        services: serviceList,
      }
    } catch (error) {
      console.error('Error fetching service list:', error)
      throw error
    }
  }

  static _buildWhereCondition(search, category_id) {
    const whereCondition = {}

    if (search) {
      whereCondition[Op.or] = [
        { service_name_th: { [Op.like]: `%${search}%` } },
        { service_name_en: { [Op.like]: `%${search}%` } },
        { cover_description_th: { [Op.like]: `%${search}%` } },
        { cover_description_en: { [Op.like]: `%${search}%` } },
      ]
    }

    if (category_id) {
      whereCondition.category_id = category_id
    }

    return whereCondition
  }

  static _mapServiceToResponse(service) {
    return {
      id: service.id,
      status: service.status,
      cover_image_id: service.cover_image_id,
      cover_image_url: service.cover_image_url,
      service_name_th: service.service_name_th,
      service_name_en: service.service_name_en,
      service_price: service.service_price,
      cover_description_th: service.cover_description_th,
      cover_description_en: service.cover_description_en,
      updated_at: service.updated_at,
      created_at: service.created_at,
    }
  }

  static async createDraftService() {
    try {
      const service = await models.Service.create({
        status: 'draft',
      })

      return { service_id: service.id }
    } catch (error) {
      console.error('Error creating draft service:', error)
      throw error
    }
  }

  static async deleteServiceById(service_id) {
    try {
      const service = await models.Service.findByPk(service_id)

      if (!service) {
        const error = new Error('Service not found')
        error.status = 404
        throw error
      }

      await service.destroy()
      return { message: 'Service and related contents deleted successfully' }
    } catch (error) {
      console.error(`Error deleting service with ID ${service_id}:`, error)
      throw error
    }
  }
}

module.exports = PageServiceListService
