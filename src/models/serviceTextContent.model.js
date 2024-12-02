const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class ServiceTextContent extends Model {}


ServiceTextContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_contents',
        key: 'id',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
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
    modelName: 'ServiceTextContent',
    tableName: 'service_text_contents',
    timestamps: false,
  }
)

module.exports = ServiceTextContent
