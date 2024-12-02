const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BlogTag extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogTag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         blog_id:
 *           type: integer
 *           description: "Foreign key referencing the ID of the blog"
 *           example: 1
 *         tag_id:
 *           type: integer
 *           description: "Foreign key referencing the ID of the tag"
 *           example: 2
 *       required:
 *         - blog_id
 *         - tag_id
 */

BlogTag.init(
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
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BlogTag',
    tableName: 'blog_tags',
    timestamps: false,
  }
)

module.exports = BlogTag
