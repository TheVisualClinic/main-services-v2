const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAvatars:
 *       type: object
 *       properties:
 *         avatar_id:
 *           type: integer
 *           description: Unique identifier for the avatar.
 *           example: 1
 *         user_id:
 *           type: string
 *           description: Identifier of the user associated with the avatar.
 *           example: "user_12345"
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: URL of the avatar image.
 *           example: "https://example.com/avatars/avatar1.png"
 *         avatar_path:
 *           type: string
 *           description: File path of the avatar image on the server.
 *           example: "/uploads/avatars/avatar1.png"
 *         upload_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the avatar was uploaded.
 *           example: "2023-09-08T12:34:56.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last update of the avatar data.
 *           example: "2023-09-09T14:12:34.000Z"
 */

class UserAvatars extends Model {}

UserAvatars.init(
  {
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserAvatars',
    tableName: 'user_avatars',
    timestamps: true,
    paranoid: false,
    createdAt: 'upload_at',
    updatedAt: 'updated_at',
  }
)

module.exports = UserAvatars
