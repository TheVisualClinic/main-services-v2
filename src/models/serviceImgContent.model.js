const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class ServiceImageContent extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceImageContent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the service image content.
 *           example: 1
 *         service_content_id:
 *           type: integer
 *           description: Identifier for the related service content.
 *           example: 10
 *         service_id:
 *           type: integer
 *           description: Identifier for the related service.
 *           example: 20
 *         type:
 *           type: string
 *           description: Type of the service image content.
 *           example: "thumbnail"
 *         image_id:
 *           type: integer
 *           description: Identifier for the primary image.
 *           example: 101
 *         image_url:
 *           type: string
 *           description: URL for the primary image.
 *           example: "https://example.com/images/primary.jpg"
 *         alt_text_th:
 *           type: string
 *           description: Alternative text for the primary image in Thai.
 *           example: "ภาพหลัก"
 *         alt_text_en:
 *           type: string
 *           description: Alternative text for the primary image in English.
 *           example: "Primary image"
 *         image_2_id:
 *           type: integer
 *           description: Identifier for the secondary image.
 *           example: 102
 *         image_2_url:
 *           type: string
 *           description: URL for the secondary image.
 *           example: "https://example.com/images/secondary.jpg"
 *         alt_2_text_th:
 *           type: string
 *           description: Alternative text for the secondary image in Thai.
 *           example: "ภาพรอง"
 *         alt_2_text_en:
 *           type: string
 *           description: Alternative text for the secondary image in English.
 *           example: "Secondary image"
 *         image_3_id:
 *           type: integer
 *           description: Identifier for the tertiary image.
 *           example: 103
 *         image_3_url:
 *           type: string
 *           description: URL for the tertiary image.
 *           example: "https://example.com/images/tertiary.jpg"
 *         alt_3_text_th:
 *           type: string
 *           description: Alternative text for the tertiary image in Thai.
 *           example: "ภาพสาม"
 *         alt_3_text_en:
 *           type: string
 *           description: Alternative text for the tertiary image in English.
 *           example: "Tertiary image"
 */

ServiceImageContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_contents',
        key: 'id',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_text_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_text_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_2_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_2_text_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_2_text_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_3_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_3_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_3_text_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt_3_text_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ServiceImageContent',
    tableName: 'service_image_contents',
    timestamps: false,
  }
)

module.exports = ServiceImageContent
