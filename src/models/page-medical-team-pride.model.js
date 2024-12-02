const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamPride extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeamPride:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team Pride record.
 *           example: 1
 *         page_medical_team_id:
 *           type: integer
 *           description: ID of the associated Page Medical Team.
 *           example: 101
 *         pride_order:
 *           type: integer
 *           description: Order of the pride item in the section.
 *           example: 1
 *         image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the pride image.
 *           example: 202
 *         image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the pride image.
 *           example: "https://example.com/pride.jpg"
 *       required:
 *         - id
 *         - page_medical_team_id
 *         - pride_order
 */

PageMedicalTeamPride.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_medical_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pride_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageMedicalTeamPride',
    tableName: 'page_medical_team_pride',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamPride
