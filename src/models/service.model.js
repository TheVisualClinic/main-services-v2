const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class Service extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the service
 *           example: 1
 *         service_name_th:
 *           type: string
 *           description: Name of the service in Thai
 *           example: "บริการทำความสะอาด"
 *         service_name_en:
 *           type: string
 *           description: Name of the service in English
 *           example: "Cleaning Service"
 *         service_price:
 *           type: integer
 *           description: Price of the service in Thai Baht
 *           example: 1500
 *         cover_description_th:
 *           type: string
 *           description: Cover description of the service in Thai
 *           example: "บริการคุณภาพสูงสำหรับบ้านและที่ทำงาน"
 *         cover_description_en:
 *           type: string
 *           description: Cover description of the service in English
 *           example: "High-quality service for home and office"
 *         header_image_id:
 *           type: integer
 *           description: ID of the header image
 *           example: 123
 *         header_image_url:
 *           type: string
 *           description: URL of the header image
 *           example: "https://example.com/images/header.jpg"
 *         cover_image_id:
 *           type: integer
 *           description: ID of the cover image
 *           example: 456
 *         cover_image_url:
 *           type: string
 *           description: URL of the cover image
 *           example: "https://example.com/images/cover.jpg"
 *         status:
 *           type: string
 *           enum: ["draft", "public", "unpublic"]
 *           description: "Publication status of the service"
 *           example: "draft"
 *         slug_th:
 *           type: string
 *           description: URL-friendly identifier for the service in Thai
 *           example: "บริการทำความสะอาด"
 *         slug_en:
 *           type: string
 *           description: URL-friendly identifier for the service in English
 *           example: "cleaning-service"
 *         category_id:
 *           type: integer
 *           description: ID of the associated category
 *           example: 5
 *         public_at:
 *           type: string
 *           format: date-time
 *           description: "Date and time when the service was made public"
 *           example: "2024-10-27T00:00:00Z"
 */

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_name_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_name_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    cover_description_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_description_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    header_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    header_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cover_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'public', 'unpublic'),
      allowNull: false,
      defaultValue: 'draft',
    },
    slug_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    public_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (service) => {
        service.slug_th = service.slug_th || generateDraftSlugTh()
        service.slug_en = service.slug_en || generateDraftSlugEn()
      },
    },
  }
)

const generateDraftSlugTh = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `service-th-${year}${month}${day}${hours}${minutes}${seconds}`
}

const generateDraftSlugEn = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `service-en-${year}${month}${day}${hours}${minutes}${seconds}`
}

module.exports = Service
