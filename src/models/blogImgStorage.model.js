const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BlogImgStorage extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogImgStorage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         image_url:
 *           type: string
 *           format: url
 *           description: "URL of the stored image"
 *           example: "https://www.example.com/images/sample.jpg"
 *         image_id:
 *           type: integer
 *           description: "ID of the image associated with the blog"
 *           example: 101
 *         image_name:
 *           type: string
 *           maxLength: 100
 *           description: "Name of the image file"
 *           example: "sample_image.jpg"
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the image record was created"
 *           example: "2024-10-27T00:00:00Z"
 *         last_update:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the image record was last updated"
 *           example: "2024-10-27T00:00:00Z"
 *       required:
 *         - id
 */

BlogImgStorage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BlogImgStorage',
    tableName: 'blog_img_storage',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'last_update',
  }
)

module.exports = BlogImgStorage
