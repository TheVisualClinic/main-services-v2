const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BlogImage extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogImage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         blog_id:
 *           type: integer
 *           description: "ID of the blog associated with the image"
 *           example: 1
 *         image_id:
 *           type: integer
 *           description: "ID of the image associated with the blog"
 *           example: 101
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the blog image was created"
 *           example: "2024-10-27T00:00:00Z"
 *         last_update:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the blog image was last updated"
 *           example: "2024-10-27T00:00:00Z"
 */

BlogImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BlogImage',
    tableName: 'blog_image',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'last_update',
  }
)

module.exports = BlogImage
