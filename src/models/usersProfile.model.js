const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user profile
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user this profile belongs to
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         nick_name:
 *           type: string
 *           description: The nick name of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         avatar_id:
 *           type: integer
 *           description: The ID of the user's avatar, referencing an avatar entity or image
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: The URL of the user's profile picture
 *       required:
 *         - user_id
 *         - first_name
 *         - last_name
 */

class UsersProfile extends Model {}

UsersProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: process.env.MODEL_UNIQUE === 'true',
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nick_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UsersProfile',
    tableName: 'users_profile',
    timestamps: false,
  }
)

module.exports = UsersProfile
