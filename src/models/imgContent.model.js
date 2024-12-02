const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class ImageContent extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageContent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID of the image content"
 *           example: 1
 *         blogContentId:
 *           type: integer
 *           description: "Foreign key referencing the ID of the related blog content"
 *           example: 10
 *         blog_id:
 *           type: integer
 *           description: "Foreign key referencing the ID of the related blog post"
 *           example: 5
 *         type:
 *           type: string
 *           description: "Type or category of the image content"
 *           example: "cover"
 *         image_id:
 *           type: integer
 *           description: "ID of the main image"
 *           example: 101
 *         image_url:
 *           type: string
 *           format: url
 *           description: "URL of the main image"
 *           example: "https://www.example.com/images/blog-image.jpg"
 *         alt_text_th:
 *           type: string
 *           description: "Alternative text in Thai for the main image"
 *           example: "ภาพตัวอย่างบทความ"
 *         alt_text_en:
 *           type: string
 *           description: "Alternative text in English for the main image"
 *           example: "Sample blog image"
 *         image_2_id:
 *           type: integer
 *           description: "ID of the second image"
 *           example: 102
 *         image_2_url:
 *           type: string
 *           format: url
 *           description: "URL of the second image"
 *           example: "https://www.example.com/images/blog-image-2.jpg"
 *         alt_2_text_th:
 *           type: string
 *           description: "Alternative text in Thai for the second image"
 *           example: "ภาพที่สองของบทความ"
 *         alt_2_text_en:
 *           type: string
 *           description: "Alternative text in English for the second image"
 *           example: "Second blog image"
 *         image_3_id:
 *           type: integer
 *           description: "ID of the third image"
 *           example: 103
 *         image_3_url:
 *           type: string
 *           format: url
 *           description: "URL of the third image"
 *           example: "https://www.example.com/images/blog-image-3.jpg"
 *         alt_3_text_th:
 *           type: string
 *           description: "Alternative text in Thai for the third image"
 *           example: "ภาพที่สามของบทความ"
 *         alt_3_text_en:
 *           type: string
 *           description: "Alternative text in English for the third image"
 *           example: "Third blog image"
 *       required:
 *         - blogContentId
 *         - blog_id
 */

ImageContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blog_contents',
        key: 'id',
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
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
    modelName: 'ImageContent',
    tableName: 'image_contents',
    timestamps: false,
  }
)

module.exports = ImageContent
