const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamDoctorSchool extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeamDoctorSchool:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team Doctor School record.
 *           example: 1
 *         page_medical_team_doctor_id:
 *           type: integer
 *           description: ID of the associated doctor in the medical team.
 *           example: 101
 *         school_order:
 *           type: integer
 *           description: Order of the school in the list.
 *           example: 1
 *         text_th:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: School description in Thai.
 *           example: "จบการศึกษาจากมหาวิทยาลัยเชียงใหม่"
 *         text_en:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: School description in English.
 *           example: "Graduated from Chiang Mai University"
 *       required:
 *         - id
 *         - page_medical_team_doctor_id
 *         - school_order
 */

PageMedicalTeamDoctorSchool.init(
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
    school_order: {
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
    modelName: 'PageMedicalTeamDoctorSchool',
    tableName: 'page_medical_team_doctor_school',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamDoctorSchool
