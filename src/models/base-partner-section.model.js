const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BasePartnerSection extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BasePartnerSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the BasePartnerSection
 *           example: 1
 *         title_th:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: The title of the section in Thai
 *           example: "พันธมิตรของเรา"
 *         title_en:
 *           type: string
 *           maxLength: 150
 *           nullable: true
 *           description: The title of the section in English
 *           example: "Our Partners"
 *         image_sm_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the small-sized image
 *           example: 101
 *         image_sm_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the small-sized image
 *           example: "https://example.com/images/small.jpg"
 *         image_md_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the medium-sized image
 *           example: 102
 *         image_md_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the medium-sized image
 *           example: "https://example.com/images/medium.jpg"
 *         image_lg_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the large-sized image
 *           example: 103
 *         image_lg_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the large-sized image
 *           example: "https://example.com/images/large.jpg"
 *       required:
 *         - id
 */

BasePartnerSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title_th: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    image_sm_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_sm_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_md_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_md_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_lg_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_lg_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BasePartnerSection',
    tableName: 'base_partner_section',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await BasePartnerSection.count()
        if (count === 0) {
          await BasePartnerSection.create({})
        }
      },
    },
  }
)

module.exports = BasePartnerSection
