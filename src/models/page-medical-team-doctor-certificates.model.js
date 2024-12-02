const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamDoctorCertificates extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeamDoctorCertificates:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team Doctor Certificate record.
 *           example: 1
 *         page_medical_team_doctor_id:
 *           type: integer
 *           description: ID of the associated doctor in the medical team.
 *           example: 101
 *         certificate_order:
 *           type: integer
 *           description: Order of the certificate in the list.
 *           example: 1
 *         text_th:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: Certificate description in Thai.
 *           example: "ได้รับใบรับรองศัลยกรรมตกแต่ง"
 *         text_en:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: Certificate description in English.
 *           example: "Certified in Cosmetic Surgery"
 *       required:
 *         - id
 *         - page_medical_team_doctor_id
 *         - certificate_order
 */

PageMedicalTeamDoctorCertificates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_medical_team_doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certificate_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text_th: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    text_en: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageMedicalTeamDoctorCertificates',
    tableName: 'page_medical_team_doctor_certificates',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamDoctorCertificates
