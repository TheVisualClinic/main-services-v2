const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeam extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team record.
 *           example: 1
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai for the page.
 *           example: "ทีมแพทย์ของเรา"
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English for the page.
 *           example: "Our Medical Team"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai for the page.
 *           example: "เกี่ยวกับทีมแพทย์"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English for the page.
 *           example: "About Our Medical Team"
 *         header_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the header image.
 *           example: 101
 *         header_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the header image.
 *           example: "https://example.com/header.jpg"
 *         section_certificates_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai for the certificates section.
 *           example: "ใบรับรองของเรา"
 *         section_certificates_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English for the certificates section.
 *           example: "Our Certificates"
 *         section_certificates_title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai for the certificates section.
 *           example: "รายละเอียดใบรับรอง"
 *         section_certificates_title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English for the certificates section.
 *           example: "Details of Certificates"
 *         section_certificates_main_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the main image for the certificates section.
 *           example: 201
 *         section_certificates_main_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the main image for the certificates section.
 *           example: "https://example.com/certificates-main.jpg"
 *         section_pride_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai for the pride section.
 *           example: "ความภาคภูมิใจของเรา"
 *         section_pride_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English for the pride section.
 *           example: "Our Pride"
 *         section_pride_title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai for the pride section.
 *           example: "ความสำเร็จและความภาคภูมิใจ"
 *         section_pride_title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English for the pride section.
 *           example: "Achievements and Pride"
 *       required:
 *         - id
 */

PageMedicalTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    header_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    header_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_certificates_caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_certificates_caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_certificates_title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_certificates_title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_certificates_main_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    section_certificates_main_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_pride_caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_pride_caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    section_pride_title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    section_pride_title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageMedicalTeam',
    tableName: 'page_medical_team',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageMedicalTeam.count()
        if (count === 0) {
          await PageMedicalTeam.create({})
        }
      },
    },
  }
)

module.exports = PageMedicalTeam
