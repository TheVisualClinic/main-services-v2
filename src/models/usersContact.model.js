const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersContact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user contact
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user this contact belongs to
 *         email:
 *           type: string
 *           description: The email of the user
 *         mobile_phone:
 *           type: string
 *           description: The mobile phone number of the user
 *       required:
 *         - user_id
 *         - email
 *         - mobile_phone
 */

class UsersContact extends Model {}

UsersContact.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile_phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UsersContact',
    tableName: 'users_contact',
    timestamps: false,
  }
)

module.exports = UsersContact
