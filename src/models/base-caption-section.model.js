const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BaseCaptionSection extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseCaptionSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the BaseCaptionSection
 *           example: 1
 *         background_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the background image
 *           example: 101
 *         background_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the background image
 *           example: "https://example.com/images/background.jpg"
 *         title_th:
 *           type: string
 *           maxLength: 200
 *           nullable: true
 *           description: The title in Thai
 *           example: "หัวข้อภาษาไทย"
 *         title_en:
 *           type: string
 *           maxLength: 200
 *           nullable: true
 *           description: The title in English
 *           example: "English Title"
 *         content_th:
 *           type: string
 *           nullable: true
 *           description: The content in Thai
 *           example: "เนื้อหาเกี่ยวกับส่วนนี้ในภาษาไทย"
 *         content_en:
 *           type: string
 *           nullable: true
 *           description: The content in English
 *           example: "This is the content for this section in English."
 *       required:
 *         - id
 */

BaseCaptionSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    background_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    background_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title_th: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    content_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BaseCaptionSection',
    tableName: 'base_caption_section',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await BaseCaptionSection.count()
        if (count === 0) {
          await BaseCaptionSection.create({})
        }
      },
    },
  }
)

module.exports = BaseCaptionSection
