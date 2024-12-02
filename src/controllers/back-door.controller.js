const BackDoorService = require('../services/back-door.services')
const ResponseHandle = require('../utils/responseHandle')

class BackDoorController {
  static async checkBlogOrder(req, res) {
    try {
      const { pin } = req.query

      if (pin !== '273388') {
        return ResponseHandle.error(res, 401, 'Invalid or unauthorized PIN')
      }

      const result = await BackDoorService.checkBlogOrder()

      return ResponseHandle.success(res, result, 'Successfully retrieved blog order')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async adjustBlogsDuplicateOrders(req, res) {
    try {
      const { pin } = req.query

      if (pin !== '273388') {
        return ResponseHandle.error(res, 401, 'Invalid or unauthorized PIN')
      }

      const result = await BackDoorService.adjustBlogsDuplicateOrders()

      return ResponseHandle.success(res, result, 'Successfully adjusted blog orders')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async checkServicesOrder(req, res) {
    try {
      const { pin } = req.query

      if (pin !== '273388') {
        return ResponseHandle.error(res, 401, 'Invalid or unauthorized PIN')
      }

      const result = await BackDoorService.checkServicesOrder()

      return ResponseHandle.success(res, result, 'Successfully retrieved service order')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = BackDoorController
