const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageReviewsGroup extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageReviewsGroup:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Reviews Group
 *           example: 1
 *         review_page_id:
 *           type: integer
 *           description: The ID of the associated review page
 *           example: 101
 *         group_order:
 *           type: integer
 *           description: The order of the review group for sorting purposes
 *           example: 1
 *         group_name_th:
 *           type: string
 *           maxLength: 200
 *           description: The name of the review group in Thai
 *           example: "กลุ่มรีวิวเด่น"
 *         group_name_en:
 *           type: string
 *           maxLength: 200
 *           description: The name of the review group in English
 *           example: "Featured Review Group"
 *       required:
 *         - review_page_id
 *         - group_order
 *         - group_name_th
 *         - group_name_en
 */

PageReviewsGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    review_page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_name_th: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    group_name_en: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PageReviewsGroup',
    tableName: 'page_reviews_group',
    timestamps: false,
  }
)

module.exports = PageReviewsGroup
