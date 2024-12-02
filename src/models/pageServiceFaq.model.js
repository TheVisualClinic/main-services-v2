const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     PageServiceFaq:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Primary key for the FAQ
 *           example: 1
 *         faq_order:
 *           type: integer
 *           description: Order of the FAQ within the service
 *           example: 1
 *         service_id:
 *           type: integer
 *           description: The ID of the associated service
 *           example: 101
 *         title_th:
 *           type: string
 *           description: FAQ title in Thai
 *           example: "คำถามที่พบบ่อย"
 *         title_en:
 *           type: string
 *           description: FAQ title in English
 *           example: "Frequently Asked Questions"
 *         description_th:
 *           type: string
 *           description: FAQ description in Thai
 *           example: "นี่คือคำอธิบายสำหรับคำถามที่พบบ่อยในภาษาไทย"
 *         description_en:
 *           type: string
 *           description: FAQ description in English
 *           example: "This is the description for frequently asked questions in English"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the record was created
 *           example: "2024-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the record was last updated
 *           example: "2024-01-02T12:00:00Z"
 */

class PageServiceFaq extends Model {}

PageServiceFaq.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    faq_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageServiceFaq',
    tableName: 'page_service_faq',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = PageServiceFaq
