const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         role_id:
 *           type: integer
 *           description: The unique identifier for the role.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the role.
 *           example: "Administrator"
 *       required:
 *         - role_id
 *         - name
 */

class Roles extends Model {}

Roles.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: false,
    paranoid: false,
    hooks: {
      afterSync: async () => {
        const count = await Roles.count()
        if (count === 0) {
          const roles = [{ name: 'captain' }, { name: 'owner' }, { name: 'admin' }]
          for (const role of roles) {
            await Roles.create(role)
          }
        }
      },
    },
  }
)

module.exports = Roles
