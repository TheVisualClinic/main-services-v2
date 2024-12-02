const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogStorage:
 *       type: object
 *       required:
 *         - image_url
 *         - image_path
 *         - image_original_name
 *         - image_type
 *         - image_size
 *         - upload_by
 *       properties:
 *         image_id:
 *           type: integer
 *           description: Unique ID of the image (Primary Key)
 *           example: 1
 *         image_url:
 *           type: string
 *           description: URL where the image is stored
 *           example: "https://example.com/images/sample.jpg"
 *         image_path:
 *           type: string
 *           description: File path of the image on the server
 *           example: "/uploads/images/sample.jpg"
 *         image_original_name:
 *           type: string
 *           description: Original name of the image file
 *           example: "sample.jpg"
 *         image_type:
 *           type: string
 *           description: MIME type of the image
 *           example: "image/jpeg"
 *         image_size:
 *           type: integer
 *           description: Size of the image file in bytes
 *           example: 204800
 *         upload_by:
 *           type: string
 *           description: Name or ID of the user who uploaded the image
 *           example: "admin"
 *         upload_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the image was uploaded
 *           example: "2024-09-16T12:34:56.789Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the image record was last updated
 *           example: "2024-09-16T12:34:56.789Z"
 */

class BlogStorage extends Model {}

BlogStorage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_original_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upload_by: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogStorage',
    tableName: 'blog_storage',
    timestamps: true,
    paranoid: false,
    createdAt: 'upload_at',
    updatedAt: 'updated_at',
  }
)

module.exports = BlogStorage
