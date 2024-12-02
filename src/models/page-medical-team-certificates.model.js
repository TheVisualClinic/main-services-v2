const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamCertificates extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeamCertificates:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team Certificate record.
 *           example: 1
 *         page_medical_team_id:
 *           type: integer
 *           description: ID of the associated Page Medical Team.
 *           example: 101
 *         certificate_order:
 *           type: integer
 *           description: Order of the certificate in the section.
 *           example: 1
 *         image_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the certificate image.
 *           example: 201
 *         image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the certificate image.
 *           example: "https://example.com/certificate.jpg"
 *       required:
 *         - id
 *         - page_medical_team_id
 *         - certificate_order
 */

PageMedicalTeamCertificates.init(
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
    certificate_order: {
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
    modelName: 'PageMedicalTeamCertificates',
    tableName: 'page_medical_team_certificates',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamCertificates
