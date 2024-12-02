const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class ServiceContent extends Model {}

ServiceContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    content_type: {
      type: DataTypes.ENUM('TEXT', 'IMAGE'),
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ServiceContent',
    tableName: 'service_contents',
    timestamps: true,
    createdAt: 'create_add',
    updatedAt: 'last_update',
  }
)

module.exports = ServiceContent
