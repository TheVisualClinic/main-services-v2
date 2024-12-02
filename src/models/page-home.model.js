const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageHome extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageHome:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Home record.
 *           example: 1
 *         hero_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the hero image.
 *           example: 101
 *         hero_image_url:
 *           type: string
 *           nullable: true
 *           description: URL of the hero image.
 *           example: "https://example.com/hero.jpg"
 *         hero_slogan_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Slogan in Thai for the hero section.
 *           example: "สุขภาพดีเริ่มต้นที่นี่"
 *         hero_slogan_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Slogan in English for the hero section.
 *           example: "Good health starts here."
 *         hero_content_th:
 *           type: string
 *           nullable: true
 *           description: Content in Thai for the hero section.
 *           example: "รายละเอียดสุขภาพดีในภาษาไทย"
 *         hero_content_en:
 *           type: string
 *           nullable: true
 *           description: Content in English for the hero section.
 *           example: "Details of good health in English."
 *         section_medical_team_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai for the medical team section.
 *           example: "ทีมแพทย์ผู้เชี่ยวชาญ"
 *         section_medical_team_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English for the medical team section.
 *           example: "Expert Medical Team"
 *         section_medical_team_title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai for the medical team section.
 *           example: "แพทย์ผู้เชี่ยวชาญด้านสุขภาพ"
 *         section_medical_team_title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English for the medical team section.
 *           example: "Health Specialist Doctors"
 *         middle_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the middle image.
 *           example: 202
 *         middle_image_url:
 *           type: string
 *           nullable: true
 *           description: URL of the middle image.
 *           example: "https://example.com/middle.jpg"
 *         section_vdo_slogan:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Slogan for the video section.
 *           example: "ชมวิดีโอสุขภาพ"
 *         section_vdo_content_th:
 *           type: string
 *           nullable: true
 *           description: Content in Thai for the video section.
 *           example: "วิดีโอเกี่ยวกับสุขภาพในภาษาไทย"
 *         section_vdo_content_en:
 *           type: string
 *           nullable: true
 *           description: Content in English for the video section.
 *           example: "Videos about health in English."
 *         section_vdo_link:
 *           type: string
 *           nullable: true
 *           description: Link to the video section.
 *           example: "https://youtube.com/yourvideo"
 *         section_services_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai for the services section.
 *           example: "บริการของเรา"
 *         section_services_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English for the services section.
 *           example: "Our Services"
 *         section_services_title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai for the services section.
 *           example: "รายละเอียดบริการในภาษาไทย"
 *         section_services_title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English for the services section.
 *           example: "Details of our services in English."
 */

PageHome.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hero_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hero_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hero_slogan_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    hero_slogan_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    hero_content_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hero_content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_medical_team_caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_medical_team_caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_medical_team_title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_medical_team_title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    middle_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    middle_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_vdo_slogan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    section_vdo_content_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_vdo_content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_vdo_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_services_caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_services_caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_services_title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_services_title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageHome',
    tableName: 'page_home',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageHome.count()
        if (count === 0) {
          await PageHome.create({})
        }
      },
    },
  }
)

module.exports = PageHome
