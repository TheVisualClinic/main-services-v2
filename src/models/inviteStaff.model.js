const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     InviteStaff:
 *       type: object
 *       properties:
 *         invite_id:
 *           type: integer
 *           description: The unique identifier for the invitation.
 *           example: 1
 *         email:
 *           type: string
 *           description: The email address of the staff being invited.
 *           example: "staff@example.com"
 *         invite_key:
 *           type: string
 *           description: The unique key associated with the invitation.
 *           example: "abc123def456ghi789"
 *         role_id:
 *           type: integer
 *           description: The role identifier of the staff being invited.
 *           example: 2
 *         joined:
 *           type: boolean
 *           description: Indicates whether the staff member has joined the workspace.
 *           example: false
 *         expires_in:
 *           type: string
 *           format: date-time
 *           description: The expiration date and time of the invitation.
 *           example: "2024-08-14T00:00:00.000Z"
 *         invited_by:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user who sent the invitation.
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         invited_again_by:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user who re-sent the invitation, if applicable.
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         invited_again_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the invitation was re-sent, if applicable.
 *           example: "2024-08-14T00:00:00.000Z"
 *         accept_user_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user who accepted the invitation.
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *       required:
 *         - invite_id
 *         - email
 *         - invite_key
 *         - role_id
 *         - joined
 *         - expires_in
 *         - invited_by
 */

class InviteStaff extends Model {}

InviteStaff.init(
  {
    invite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    invite_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    joined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invited_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    invited_again_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    invited_again_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    accept_user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'InviteStaff',
    tableName: 'invite_staff',
    timestamps: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = InviteStaff
