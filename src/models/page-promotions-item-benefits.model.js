const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PagePromotionsItemBenefits extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PagePromotionsItemBenefits:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the promotion item benefit
 *           example: 1
 *         page_promotions_item_id:
 *           type: integer
 *           description: The ID of the associated promotion item
 *           example: 101
 *         benefits_order:
 *           type: integer
 *           description: The order of the benefit within the promotion item
 *           example: 1
 *         text_th:
 *           type: string
 *           nullable: true
 *           description: Benefit text in Thai
 *           example: "ได้รับส่วนลด 20%"
 *         text_en:
 *           type: string
 *           nullable: true
 *           description: Benefit text in English
 *           example: "Get a 20% discount"
 *       required:
 *         - id
 *         - page_promotions_item_id
 *         - benefits_order
 */

PagePromotionsItemBenefits.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_promotions_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    benefits_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text_th: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    text_en: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PagePromotionsItemBenefits',
    tableName: 'page_promotions_item_benefits',
    timestamps: false,
  }
)

module.exports = PagePromotionsItemBenefits
