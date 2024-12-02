const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     PublicStorage:
 *       type: object
 *       required:
 *         - image_url
 *         - image_path
 *       properties:
 *         image_id:
 *           type: integer
 *           description: Unique ID of the image (Primary Key)
 *           example: 1
 *         image_url:
 *           type: string
 *           description: URL of the image stored in the system
 *           example: "https://example.com/images/sample.jpg"
 *         image_path:
 *           type: string
 *           description: File path of the image stored on the server
 *           example: "/uploads/images/sample.jpg"
 */

class PublicStorage extends Model {}

PublicStorage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PublicStorage',
    tableName: 'public_storage',
    timestamps: false,
    paranoid: false,
  }
)

module.exports = PublicStorage
