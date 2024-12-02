const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PagePromotionsItem extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PagePromotionsItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the promotion item
 *           example: 1
 *         page_promotions_id:
 *           type: integer
 *           description: The ID of the associated Page Promotions
 *           example: 101
 *         item_order:
 *           type: integer
 *           description: The order of the promotion item
 *           example: 1
 *         item_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the associated image for the promotion item
 *           example: 201
 *         item_image_url:
 *           type: string
 *           nullable: true
 *           description: URL of the associated image for the promotion item
 *           example: "https://example.com/image.jpg"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Title of the promotion item in Thai
 *           example: "ลดราคาพิเศษ"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: Title of the promotion item in English
 *           example: "Special Discount"
 *         description_th:
 *           type: string
 *           nullable: true
 *           description: Description of the promotion item in Thai
 *           example: "ลดราคาเฉพาะเดือนนี้"
 *         description_en:
 *           type: string
 *           nullable: true
 *           description: Description of the promotion item in English
 *           example: "Discount available only this month"
 *         promotion_price:
 *           type: integer
 *           description: The promotional price for the item
 *           example: 999
 *         status:
 *           type: string
 *           enum: [ "draft", "public", "unpublic" ]
 *           description: The status of the promotion item
 *           example: "draft"
 *         public_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the item was published
 *           example: "2024-01-01T12:00:00Z"
 *         public_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: The UUID of the user who published the item
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         created_by:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user who created the item
 *           example: "123e4567-e89b-12d3-a456-426614174001"
 *         updated_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: The UUID of the user who last updated the item
 *           example: "123e4567-e89b-12d3-a456-426614174002"
 *       required:
 *         - id
 *         - page_promotions_id
 *         - item_order
 *         - status
 *         - created_by
 */

PagePromotionsItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_promotions_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_image_url: {
      type: DataTypes.TEXT,
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
    description_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    promotion_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('draft', 'public', 'unpublic'),
      allowNull: false,
      defaultValue: 'draft',
    },
    public_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    public_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PagePromotionsItem',
    tableName: 'page_promotions_item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = PagePromotionsItem
