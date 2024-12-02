const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageReviews extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageReviews:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Reviews section
 *           example: 1
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in Thai
 *           example: "รีวิวจากผู้ใช้จริง"
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption in English
 *           example: "Customer Reviews"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Title in Thai
 *           example: "ความเห็นจากลูกค้า"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: Title in English
 *           example: "Customer Feedback"
 *         header_image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the header image
 *           example: 101
 *         header_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the header image
 *           example: "https://example.com/header.jpg"
 *         sub_review_caption_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Caption for sub-reviews in Thai
 *           example: "รีวิวเพิ่มเติม"
 *         sub_review_caption_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Caption for sub-reviews in English
 *           example: "More Reviews"
 *         sub_review_1_rating:
 *           type: integer
 *           nullable: true
 *           description: Rating for sub-review 1 (1-5)
 *           example: 5
 *         sub_review_1_message_th:
 *           type: string
 *           nullable: true
 *           description: Sub-review 1 message in Thai
 *           example: "บริการยอดเยี่ยม"
 *         sub_review_1_message_en:
 *           type: string
 *           nullable: true
 *           description: Sub-review 1 message in English
 *           example: "Excellent service"
 *         sub_review_1_nick_name_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 1 in Thai
 *           example: "คุณสมชาย"
 *         sub_review_1_nick_name_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 1 in English
 *           example: "John"
 *         sub_review_2_rating:
 *           type: integer
 *           nullable: true
 *           description: Rating for sub-review 2 (1-5)
 *           example: 4
 *         sub_review_2_message_th:
 *           type: string
 *           nullable: true
 *           description: Sub-review 2 message in Thai
 *           example: "ดีมาก"
 *         sub_review_2_message_en:
 *           type: string
 *           nullable: true
 *           description: Sub-review 2 message in English
 *           example: "Very good"
 *         sub_review_2_nick_name_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 2 in Thai
 *           example: "คุณสมหญิง"
 *         sub_review_2_nick_name_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 2 in English
 *           example: "Jane"
 *         sub_review_3_rating:
 *           type: integer
 *           nullable: true
 *           description: Rating for sub-review 3 (1-5)
 *           example: 3
 *         sub_review_3_message_th:
 *           type: string
 *           nullable: true
 *           description: Sub-review 3 message in Thai
 *           example: "ดีพอใช้"
 *         sub_review_3_message_en:
 *           type: string
 *           nullable: true
 *           description: Sub-review 3 message in English
 *           example: "Fair service"
 *         sub_review_3_nick_name_th:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 3 in Thai
 *           example: "คุณสมรักษ์"
 *         sub_review_3_nick_name_en:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: Nickname for sub-review 3 in English
 *           example: "Alex"
 *       required:
 *         - id
 */

PageReviews.init(
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
    top_review_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    top_review_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    top_review_message_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    top_review_message_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    top_review_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    top_review_caption_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    top_review_caption_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    top_review_nick_name_th: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    top_review_nick_name_en: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    top_review_shot_message_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    top_review_shot_message_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_caption_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_caption_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_1_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_review_1_message_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_1_message_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_1_nick_name_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_1_nick_name_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_1_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_review_1_message_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_1_message_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_1_nick_name_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_1_nick_name_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_2_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_review_2_message_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_2_message_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_2_nick_name_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_2_nick_name_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_3_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_review_3_message_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_3_message_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_review_3_nick_name_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sub_review_3_nick_name_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reviews_section_caption_th: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reviews_section_caption_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageReviews',
    tableName: 'page_reviews',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageReviews.count()
        if (count === 0) {
          await PageReviews.create({})
        }
      },
    },
  }
)

module.exports = PageReviews
