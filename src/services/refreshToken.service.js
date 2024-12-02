const { models } = require('../models')
const { Op } = require('sequelize')

class RefreshTokenService {
  static async getAll() {
    try {
      return await models.RefreshToken.findAll()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async search({ user_id, ip_address, user_agent }) {
    try {
      const where = {}
      if (user_id) where.user_id = user_id
      if (ip_address) where.ip_address = ip_address
      if (user_agent) where.user_agent = { [Op.like]: `%${user_agent}%` }

      return await models.RefreshToken.findAll({ where })
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getByCreatedAt({ start_date, end_date }) {
    try {
      const startDate = new Date(start_date)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(end_date)
      endDate.setHours(23, 59, 59, 999)

      return await models.RefreshToken.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      })
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = RefreshTokenService
