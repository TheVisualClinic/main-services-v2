const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       required:
 *         - token
 *         - user_id
 *         - expires_at
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the refresh token
 *         token:
 *           type: text
 *           description: The refresh token
 *         user_id:
 *           type: string
 *           description: The ID of the user
 *         expires_at:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the refresh token
 *         ip_address:
 *           type: string
 *           description: The IP address of the client
 *         user_agent:
 *           type: string
 *           description: The user agent of the client
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time when the token was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time when the token was last updated
 *       example:
 *         id: 1
 *         token: abcdef123456
 *         user_id: 2
 *         expires_at: 2023-08-01T00:00:00.000Z
 *         ip_address: 192.168.1.1
 *         user_agent: Mozilla/5.0
 *         createdAt: 2023-08-01T00:00:00.000Z
 *         updatedAt: 2023-08-01T00:00:00.000Z
 */

class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true,
    paranoid: false,
  }
)

module.exports = RefreshToken
