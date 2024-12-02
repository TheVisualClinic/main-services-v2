const fs = require('fs').promises
const path = require('path')
const emailService = require('../utils/sendEmail')
const { models, sequelize } = require('../models')
const moment = require('moment')

class OtpHistoryService {
  static async getOtpHistoryList() {
    try {
      const otpHistoryList = await models.OTPHistory.findAll()
      return otpHistoryList
    } catch (error) {
      throw this._handleError(error)
    }
  }

  static async sendForgotPasswordOtp(email, action_type, agent) {
    const transaction = await sequelize.transaction()

    try {
      const account = await models.Users.findOne({
        where: {
          username: email,
        },
      })

      if (!account) {
        const error = new Error('Send OTP Error!')
        error.status = 404
        throw error
      }

      const otpRecord = await models.OTPHistory.findOne({
        where: { email, action_type, is_used: false },
        order: [['last_sent_at', 'DESC']],
      })

      if (otpRecord) {
        const timeDifference = moment().diff(otpRecord.last_sent_at, 'minutes')
        if (timeDifference < 1) {
          const error = new Error('OTP was sent too recently. Please wait 1 minute.')
          error.status = 429
          throw error
        }
      }

      const otpCode = this.generateOtpCode()
      const otpRef = this.generateOtpRef()
      const newOtpRecord = await models.OTPHistory.create(
        {
          email,
          action_type,
          otp_code: otpCode,
          otp_ref: otpRef,
          agent,
          last_sent_at: new Date(),
        },
        { transaction }
      )

      const templatePath = path.join(__dirname, '../templates/otp.template.html')
      let html = await fs.readFile(templatePath, 'utf8')
      html = html.replace('{{ otp_ref }}', otpRef).replace('{{ otp_code }}', otpCode)

      await emailService.sendEmail({
        to: email,
        subject: 'Your OTP Code',
        html,
      })

      await transaction.commit()
      return newOtpRecord
    } catch (error) {
      await transaction.rollback()
      throw this._handleError(error)
    }
  }

  static async validateOtp(email, otpCode, otpRef) {
    try {
      const otpRecord = await models.OTPHistory.findOne({
        where: {
          email,
          otp_code: otpCode,
          otp_ref: otpRef,
          is_used: false,
        },
        order: [['created_at', 'DESC']],
      })

      if (!otpRecord) {
        const error = new Error('Invalid OTP or OTP not found.')
        error.status = 404
        throw error
      }

      const otpAgeInMinutes = moment().diff(otpRecord.created_at, 'minutes')
      if (otpAgeInMinutes > 10) {
        const error = new Error('OTP has expired.')
        error.status = 400
        throw error
      }

      otpRecord.is_used = true
      await otpRecord.save()

      return { otp_id: otpRecord.otp_id }
    } catch (error) {
      throw this._handleError(error)
    }
  }

  static generateOtpCode() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static generateOtpRef() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let otpRef = ''
    for (let i = 0; i < 4; i++) {
      otpRef += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return otpRef
  }

  static _handleError(error) {
    error.status = error.status || 500
    return error
  }
}

module.exports = OtpHistoryService
