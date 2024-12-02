const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BlogCategory extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         blog_id:
 *           type: integer
 *           description: "Foreign key referencing the blog ID"
 *           example: 1
 *         category_id:
 *           type: integer
 *           description: "Foreign key referencing the category ID"
 *           example: 2
 *       required:
 *         - blog_id
 *         - category_id
 */

BlogCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogs',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BlogCategory',
    tableName: 'blog_categories',
    timestamps: false,
  }
)

module.exports = BlogCategory
