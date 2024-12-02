const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')
const bcryptjs = require('bcryptjs')
const UsersProfile = require('./usersProfile.model')
const UsersContact = require('./usersContact.model')
const UserRole = require('./userRole.model')
const UserPermission = require('./userPermission.model')
const Permissions = require('./permissions.model')

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - user_id
 *         - username
 *         - user_status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         user_status:
 *           type: string
 *           enum:
 *             - active
 *             - suspended
 *           description: The status of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time when the user was last updated
 *       example:
 *         id: 1
 *         user_id: 123e4567-e89b-12d3-a456-426614174000
 *         username: sampleuser
 *         password: password123
 *         user_status: active
 *         createdAt: 2023-08-01T00:00:00.000Z
 *         updatedAt: 2023-08-01T00:00:00.000Z
 */

class Users extends Model {}

Users.init(
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
      defaultValue: DataTypes.UUIDV4,
      unique: process.env.MODEL_UNIQUE === 'true',
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: process.env.MODEL_UNIQUE === 'true',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_status: {
      type: DataTypes.ENUM('active', 'suspended'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    hooks: {
      afterSync: async () => {
        const count = await Users.count()
        if (count === 0) {
          const hashedPassword = await bcryptjs.hash('P@ssword', 10)
          const user = await Users.create({
            username: 'captain',
            password: hashedPassword,
          })

          await UsersProfile.create({
            user_id: user.user_id,
            first_name: 'Chutipong',
            last_name: 'Kritkaow',
            nick_name: 'Phan',
            gender: 'male',
          })

          await UsersContact.create({
            user_id: user.user_id,
            email: 'ichu.dev@gmail.com',
            mobile_phone: '0930271716',
          })

          await UserRole.create({
            user_id: user.user_id,
            role_id: 1,
          })

          const permissionList = await Permissions.findAll()
          for (const permission of permissionList) {
            await UserPermission.create({
              user_id: user.user_id,
              permission_id: permission.permission_id,
            })
          }
        }
      },
    },
  }
)

module.exports = Users
