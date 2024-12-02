const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageMedicalTeamDoctor extends Model {}

PageMedicalTeamDoctor.init(
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
    doctor_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doctor_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name_prefix_th: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    name_prefix_en: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    first_name_th: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    first_name_en: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    last_name_th: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    last_name_en: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    nick_name_th: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    nick_name_en: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    doctor_slogan_th: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    doctor_slogan_en: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageMedicalTeamDoctor',
    tableName: 'page_medical_team_doctor',
    timestamps: false,
  }
)

module.exports = PageMedicalTeamDoctor
