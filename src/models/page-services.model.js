const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageServices extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageServices:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the PageServices record.
 *           example: 1
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption for the services page in Thai.
 *           example: "บริการของเรา"
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: Caption for the services page in English.
 *           example: "Our Services"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: Title for the services page in Thai.
 *           example: "รายละเอียดบริการของเราในภาษาไทย"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: Title for the services page in English.
 *           example: "Details of our services in English."
 */

PageServices.init(
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
    modelName: 'PageService',
    tableName: 'page_services',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageServices.count()
        if (count === 0) {
          await PageServices.create({})
        }
      },
    },
  }
)

module.exports = PageServices
