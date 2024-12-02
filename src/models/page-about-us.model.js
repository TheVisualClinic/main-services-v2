const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageAboutUs extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageAboutUs:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the PageAboutUs record.
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai.
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English.
 *         slogan:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Slogan text.
 *         description_th:
 *           type: string
 *           nullable: true
 *           description: Description in Thai.
 *         description_en:
 *           type: string
 *           nullable: true
 *           description: Description in English.
 *         header_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the header image.
 *         header_image_url:
 *           type: string
 *           nullable: true
 *           description: URL of the header image.
 *         about_clinic_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the about clinic image.
 *         about_clinic_image_url:
 *           type: string
 *           nullable: true
 *           description: URL of the about clinic image.
 *         about_clinic_title_th:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: Title of the about clinic section in Thai.
 *         about_clinic_title_en:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: Title of the about clinic section in English.
 *         about_clinic_content_th:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: Content of the about clinic section in Thai.
 *         about_clinic_content_en:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: Content of the about clinic section in English.
 *         about_clinic_year_of_service:
 *           type: string
 *           maxLength: 10
 *           nullable: true
 *           default: "0"
 *           description: Years of service of the clinic.
 *         about_clinic_total_service:
 *           type: string
 *           maxLength: 10
 *           nullable: true
 *           default: "0"
 *           description: Total number of services provided by the clinic.
 *         about_clinic_satisfied_customers:
 *           type: string
 *           maxLength: 10
 *           nullable: true
 *           default: "0"
 *           description: Total number of satisfied customers.
 *         section_medical_team_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption for the medical team section in Thai.
 *         section_medical_team_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption for the medical team section in English.
 *         section_medical_team_title_th:
 *           type: string
 *           nullable: true
 *           description: Title for the medical team section in Thai.
 *         section_medical_team_title_en:
 *           type: string
 *           nullable: true
 *           description: Title for the medical team section in English.
 */

PageAboutUs.init(
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
    slogan: {
      type: DataTypes.STRING(50),
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
    header_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    header_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    about_clinic_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    about_clinic_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    about_clinic_title_th: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    about_clinic_title_en: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    about_clinic_content_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    about_clinic_content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    about_clinic_year_of_service: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '0',
    },
    about_clinic_total_service: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '0',
    },
    about_clinic_satisfied_customers: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '0',
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
  },
  {
    sequelize,
    modelName: 'PageAboutUs',
    tableName: 'page_about_us',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageAboutUs.count()
        if (count === 0) {
          await PageAboutUs.create({})
        }
      },
    },
  }
)

module.exports = PageAboutUs
