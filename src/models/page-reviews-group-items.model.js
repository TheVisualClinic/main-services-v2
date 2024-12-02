const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageReviewsGroupItems extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageReviewsGroupItems:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Reviews Group Item
 *           example: 1
 *         review_page_group_id:
 *           type: integer
 *           description: The ID of the review group to which this item belongs
 *           example: 10
 *         item_order:
 *           type: integer
 *           description: The order of the item within the group
 *           example: 1
 *         item_image_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the associated image for the item
 *           example: 201
 *         item_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the associated image for the item
 *           example: "https://example.com/item-image.jpg"
 *       required:
 *         - review_page_group_id
 *         - item_order
 */

PageReviewsGroupItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    review_page_group_id: {
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
  },
  {
    sequelize,
    modelName: 'PageReviewsGroupItems',
    tableName: 'page_reviews_group_items',
    timestamps: false,
  }
)

module.exports = PageReviewsGroupItems
