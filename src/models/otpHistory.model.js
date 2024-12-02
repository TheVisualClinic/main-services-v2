const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     OTPHistory:
 *       type: object
 *       required:
 *         - email
 *         - otp_code
 *         - otp_ref
 *         - action_type
 *         - is_used
 *       properties:
 *         otp_id:
 *           type: integer
 *           description: Unique ID for the OTP record
 *           example: 1
 *         email:
 *           type: string
 *           description: The email address the OTP was sent to
 *           example: example@example.com
 *         otp_code:
 *           type: string
 *           description: The 6-digit OTP code
 *           example: "123456"
 *         otp_ref:
 *           type: string
 *           description: A 4-character alphanumeric reference for the OTP
 *           example: "A1B2"
 *         action_type:
 *           type: string
 *           description: The action that triggered the OTP generation (e.g., password reset, email verification)
 *           example: "PASSWORD_RESET"
 *         is_used:
 *           type: boolean
 *           description: Flag indicating whether the OTP has been used or not
 *           example: false
 *         agent:
 *           type: string
 *           description: The user-agent or device information from which the OTP request was made
 *           example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
 *         last_sent_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the OTP was last sent
 *           example: "2023-09-30T12:34:56.789Z"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the OTP was created
 *           example: "2023-09-30T12:34:56.789Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the OTP was last updated
 *           example: "2023-09-30T12:35:56.789Z"
 */

class OTPHistory extends Model {}

OTPHistory.init(
  {
    otp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    otp_ref: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    action_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    agent: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OTPHistory',
    tableName: 'otp_history',
    timestamps: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = OTPHistory
