const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamDoctorSkills extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageMedicalTeamDoctorSkills:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the Page Medical Team Doctor Skills record.
 *           example: 1
 *         page_medical_team_doctor_id:
 *           type: integer
 *           description: ID of the associated doctor in the medical team.
 *           example: 101
 *         skill_order:
 *           type: integer
 *           description: Order of the skill in the list.
 *           example: 1
 *         text_th:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: Skill description in Thai.
 *           example: "เชี่ยวชาญด้านศัลยกรรม"
 *         text_en:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: Skill description in English.
 *           example: "Expert in surgery"
 *       required:
 *         - id
 *         - page_medical_team_doctor_id
 *         - skill_order
 */

PageMedicalTeamDoctorSkills.init(
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
    skill_order: {
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
    modelName: 'PageMedicalTeamDoctorSkills',
    tableName: 'page_medical_team_doctor_skills',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamDoctorSkills
