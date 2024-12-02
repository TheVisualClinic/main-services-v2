const OtpHistoryService = require('../services/otpHistory.service')
const ResponseHandle = require('../utils/responseHandle')
const emailValidator = require('email-validator')

class OtpHistoryController {
  static async getOtpHistoryList(req, res) {
    try {
      const otpHistoryList = await OtpHistoryService.getOtpHistoryList()
      ResponseHandle.success(res, otpHistoryList, 'Success')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async sendForgotPasswordOtp(req, res) {
    try {
      const { email, action_type } = req.body
      const agent = req.headers['user-agent'] || 'unknown'

      if (!email || !action_type) {
        return ResponseHandle.error(res, 400, 'Missing required fields: email, action_type')
      }

      if (!emailValidator.validate(email)) {
        return ResponseHandle.error(res, 422, 'Invalid email format')
      }

      const sendResult = await OtpHistoryService.sendForgotPasswordOtp(email, action_type, agent)
      ResponseHandle.created(res, { otp_ref: sendResult.otp_ref }, 'OTP created successfully.')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async validateOtp(req, res) {
    try {
      const { email, otp_code, otp_ref } = req.body

      if (!email || !otp_code || !otp_ref) {
        return ResponseHandle.error(res, 400, 'Missing required fields: email, otp_code, otp_ref')
      }

      if (!emailValidator.validate(email)) {
        return ResponseHandle.error(res, 422, 'Invalid email format')
      }

      const validateResult = await OtpHistoryService.validateOtp(email, otp_code, otp_ref)
      ResponseHandle.success(res, validateResult, 'OTP validated successfully.')
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

module.exports = OtpHistoryController
