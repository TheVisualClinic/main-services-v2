const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user.
 *           example: "a12b3456-78c9-012d-345e-678f9012gh34"
 *         role_id:
 *           type: integer
 *           description: The unique identifier for the role assigned to the user.
 *           example: 2
 *       required:
 *         - user_id
 *         - role_id
 *       example:
 *         user_id: "a12b3456-78c9-012d-345e-678f9012gh34"
 *         role_id: 2
 */

class UserRole extends Model {}

UserRole.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_role',
    timestamps: false,
    paranoid: false,
  }
)

module.exports = UserRole
