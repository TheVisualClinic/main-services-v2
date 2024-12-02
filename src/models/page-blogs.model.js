const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageBlogs extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageBlogs:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Blogs section
 *           example: 1
 *         header_image_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the header image
 *           example: 101
 *         header_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the header image
 *           example: "https://example.com/header-image.jpg"
 *       required:
 *         - id
 */

PageBlogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    header_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    header_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageBlogs',
    tableName: 'page_blogs',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageBlogs.count()
        if (count === 0) {
          await PageBlogs.create({})
        }
      },
    },
  }
)

module.exports = PageBlogs
