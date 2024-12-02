const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class BaseSocialSection extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseSocialSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Base Social Section
 *           example: 1
 *         background_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the background image
 *           example: 101
 *         background_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the background image
 *           example: "https://example.com/images/background.jpg"
 *       required:
 *         - id
 */

BaseSocialSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    background_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    background_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BaseSocialSection',
    tableName: 'base_social_section',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await BaseSocialSection.count()
        if (count === 0) {
          await BaseSocialSection.create({})
        }
      },
    },
  }
)

module.exports = BaseSocialSection
