const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPermission:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user.
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         permission_id:
 *           type: integer
 *           description: The identifier for the permission assigned to the user.
 *           example: 101
 *       required:
 *         - user_id
 *         - permission_id
 */

class UserPermission extends Model {}

UserPermission.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'UserPermission',
    tableName: 'user_permission',
    timestamps: false,
    paranoid: false,
  }
)

module.exports = UserPermission
