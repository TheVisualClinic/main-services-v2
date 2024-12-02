const nodemailer = require('nodemailer')
const logger = require('./logger')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  async sendEmail({ to, subject, text, html }) {
    const mailOptions = {
      from: `"The Visual Clinic" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
    }

    try {
      const result = await this.transporter.sendMail(mailOptions)
      logger.info(`Email sent to ${to}: ${result.response}`)
      return result
    } catch (error) {
      logger.error('Error sending email:', error)
      throw error
    }
  }
}

module.exports = new EmailService()
