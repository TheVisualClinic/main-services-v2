const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class Category extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID of the category"
 *           example: 1
 *         name_th:
 *           type: string
 *           description: "Name th of the category"
 *           example: "Technology"
 *         name_en:
 *           type: string
 *           description: "Name en of the category"
 *           example: "Technology"
 *       required:
 *         - name
 */

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_th: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false,
    paranoid: false,
  }
)

module.exports = Category
