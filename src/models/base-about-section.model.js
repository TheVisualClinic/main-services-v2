const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BaseAboutSection extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseAboutSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Primary key
 *         background_id:
 *           type: integer
 *           nullable: true
 *           description: Background image ID
 *         background_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: Background image URL
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Thai caption for the section
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: English caption for the section
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Thai title for the section
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: English title for the section
 *         icon_1_id:
 *           type: integer
 *           nullable: true
 *           description: Icon 1 image ID
 *         icon_1_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: Icon 1 image URL
 *         icon_1_caption_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Thai caption for icon 1
 *         icon_1_caption_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: English caption for icon 1
 *         icon_2_id:
 *           type: integer
 *           nullable: true
 *           description: Icon 2 image ID
 *         icon_2_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: Icon 2 image URL
 *         icon_2_caption_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Thai caption for icon 2
 *         icon_2_caption_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: English caption for icon 2
 *         icon_3_id:
 *           type: integer
 *           nullable: true
 *           description: Icon 3 image ID
 *         icon_3_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: Icon 3 image URL
 *         icon_3_caption_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Thai caption for icon 3
 *         icon_3_caption_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: English caption for icon 3
 */

BaseAboutSection.init(
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
    caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon_1_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon_1_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon_1_caption_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon_1_caption_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon_2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon_2_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon_2_caption_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon_2_caption_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon_3_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon_3_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon_3_caption_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon_3_caption_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BaseAboutSection',
    tableName: 'base_about_section',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await BaseAboutSection.count()
        if (count === 0) {
          await BaseAboutSection.create({})
        }
      },
    },
  }
)

module.exports = BaseAboutSection
