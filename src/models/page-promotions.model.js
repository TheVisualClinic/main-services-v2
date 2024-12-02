const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PagePromotions extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PagePromotions:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Promotions entry
 *           example: 1
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai
 *           example: "โปรโมชั่นพิเศษ"
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English
 *           example: "Special Promotions"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai
 *           example: "ข้อเสนอสุดพิเศษสำหรับคุณ"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English
 *           example: "Exclusive Offers for You"
 *       required:
 *         - id
 */

PagePromotions.init(
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
  },
  {
    sequelize,
    modelName: 'PagePromotions',
    tableName: 'page_promotions',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PagePromotions.count()
        if (count === 0) {
          await PagePromotions.create({})
        }
      },
    },
  }
)

module.exports = PagePromotions
