const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class TextContent extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     TextContent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID of the text content"
 *           example: 1
 *         blogContentId:
 *           type: integer
 *           description: "Foreign key referencing the ID of the related blog content"
 *           example: 10
 *         blog_id:
 *           type: integer
 *           description: "Foreign key referencing the ID of the related blog post"
 *           example: 5
 *         text_th:
 *           type: string
 *           description: "Text content in Thai"
 *           example: "เนื้อหาในภาษาไทย"
 *         text_en:
 *           type: string
 *           description: "Text content in English"
 *           example: "Content in English"
 *         style:
 *           type: integer
 *           description: "Styling options or reference ID for text style"
 *           example: 2
 *       required:
 *         - blogContentId
 *         - blog_id
 */

TextContent.init(
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
    text_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    text_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'TextContent',
    tableName: 'text_contents',
    timestamps: false,
  }
)

module.exports = TextContent
