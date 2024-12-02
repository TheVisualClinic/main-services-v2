const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BlogContent extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogContent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         blogId:
 *           type: integer
 *           description: "Foreign key referencing the ID of the blog"
 *           example: 1
 *         contentType:
 *           type: string
 *           enum: ["Text", "Image", "TableOfContent"]
 *           description: "Type of content in the blog (Text, Image, or Table of Content)"
 *           example: "Text"
 *         order:
 *           type: integer
 *           description: "The order of the content within the blog post"
 *           example: 1
 *         create_add:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the content was created"
 *           example: "2024-10-27T00:00:00Z"
 *         last_update:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the content was last updated"
 *           example: "2024-10-27T00:00:00Z"
 *       required:
 *         - blogId
 *         - order
 */

BlogContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
        key: 'id',
      },
    },
    content_type: {
      type: DataTypes.ENUM('TEXT', 'IMAGE'),
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogContent',
    tableName: 'blog_contents',
    timestamps: true,
    createdAt: 'create_add',
    updatedAt: 'last_update',
  }
)

module.exports = BlogContent
