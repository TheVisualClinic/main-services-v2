const RefreshTokenService = require('../services/refreshToken.service')
const ResponseHandle = require('../utils/responseHandle')

class RefreshTokenController {
  static async getAll(req, res) {
    try {
      const tokens = await RefreshTokenService.getAll()
      ResponseHandle.success(res, tokens, 'Refresh tokens retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async search(req, res) {
    try {
      const { user_id, ip_address, user_agent } = req.query

      if (!user_id && !ip_address && !user_agent) {
        return ResponseHandle.error(
          res,
          400,
          'At least one search parameter (user_id, ip_address, or user_agent) is required'
        )
      }

      const tokens = await RefreshTokenService.search({ user_id, ip_address, user_agent })
      ResponseHandle.success(res, tokens, 'Search results retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getByCreatedAt(req, res) {
    try {
      const { start_date, end_date } = req.query

      if (!start_date || !end_date) {
        return ResponseHandle.error(res, 400, 'Start date and end date are required')
      }

      const tokens = await RefreshTokenService.getByCreatedAt({ start_date, end_date })
      ResponseHandle.success(res, tokens, 'Tokens retrieved by created date successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }
}

module.exports = RefreshTokenController
