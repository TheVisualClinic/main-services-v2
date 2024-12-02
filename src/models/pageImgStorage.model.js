const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageImgStorage extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageImgStorage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the image record.
 *           example: 1
 *         image_id:
 *           type: integer
 *           description: ID referencing the associated image.
 *           example: 101
 *         image_url:
 *           type: string
 *           description: URL of the stored image.
 *           example: "https://example.com/images/sample.jpg"
 *         image_name:
 *           type: string
 *           maxLength: 100
 *           description: Name of the image.
 *           example: "sample-image"
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the image was created.
 *           example: "2024-11-10T08:55:33.123Z"
 *         last_update:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the image record was last updated.
 *           example: "2024-11-10T09:15:45.456Z"
 */

PageImgStorage.init(
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
    modelName: 'PageImgStorage',
    tableName: 'page_img_storage',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'last_update',
  }
)

module.exports = PageImgStorage
