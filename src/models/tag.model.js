const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class Tag extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID of the tag"
 *           example: 1
 *         name:
 *           type: string
 *           description: "Name of the tag"
 *           example: "Health"
 *       required:
 *         - name
 */

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false,
    paranoid: false,
  }
)

module.exports = Tag
