const fs = require('fs').promises
const path = require('path')
const { models, sequelize } = require('../models')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const emailService = require('../utils/sendEmail')

class InviteStaffService {
  static async getInviteList() {
    try {
      const inviteList = await models.InviteStaff.findAll({
        where: {
          joined: false,
        },
      })

      const updatedInviteList = await Promise.all(
        inviteList.map(async (invite) => {
          const inviteBy = await models.UsersProfile.findOne({
            where: {
              user_id: invite.invited_by,
            },
            attributes: ['user_id', 'first_name', 'last_name', 'nick_name', 'avatar_url'],
          })

          const role = await models.Roles.findOne({
            where: {
              role_id: invite.role_id,
            },
            attributes: ['role_id', 'name'],
          })

          return {
            ...invite.toJSON(),
            invited_by: inviteBy,
            role: role
              ? { role_id: role.role_id, name: role.name }
              : { role_id: invite.role_id, name: 'Unknown Role' },
          }
        })
      )

      return updatedInviteList
    } catch (error) {
      throw this._handleError(error)
    }
  }

  static async getInviteJoinedList() {
    try {
      const inviteList = await models.InviteStaff.findAll({
        where: {
          joined: true,
        },
      })

      const updatedInviteList = await Promise.all(
        inviteList.map(async (invite) => {
          const inviteBy = await models.UsersProfile.findOne({
            where: {
              user_id: invite.invited_by,
            },
            attributes: ['user_id', 'first_name', 'last_name', 'nick_name', 'avatar_url'],
          })

          return {
            ...invite.toJSON(),
            invited_by: inviteBy,
          }
        })
      )

      return updatedInviteList
    } catch (error) {
      throw this._handleError(error)
    }
  }

  static async createInvite(inviteData) {
    const { email, role_id, invited_by } = inviteData

    const existingInvite = await models.InviteStaff.findOne({
      where: {
        email,
        joined: false,
        expires_in: { [Op.gt]: new Date() },
      },
    })

    if (existingInvite) {
      const error = new Error('This email has already been invited.')
      error.status = 400
      throw error
    }

    const transaction = await sequelize.transaction()

    try {
      const newInvite = await models.InviteStaff.create(
        {
          email,
          invite_key: uuidv4(),
          role_id,
          joined: false,
          expires_in: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          invited_by,
        },
        { transaction }
      )

      const role = await models.Roles.findOne({
        where: {
          role_id,
        },
      })

      if (!role) {
        await transaction.rollback()
        const error = new Error('Role not found.')
        error.status = 404
        throw error
      }

      const inviteLink = `${process.env.SIGN_UP_PATH}/en/auth/sign-up?invite_key=${newInvite.invite_key}`

      const templatePath = path.join(__dirname, '../templates/invite.template.html')
      let html = await fs.readFile(templatePath, 'utf8')
      html = html.replace('{{ inviteLink }}', inviteLink).replace('{{ roleName }}', role.name)

      const subject = 'You are invited to join a The Visual Clinic Team'

      await emailService.sendEmail({ to: email, subject, html })
      await transaction.commit()
      return newInvite
    } catch (error) {
      await transaction.rollback()
      throw this._handleError(error)
    }
  }

  static async validateInvite(invite_key) {
    const invite = await models.InviteStaff.findOne({
      where: {
        invite_key,
        expires_in: { [Op.gt]: new Date() },
        joined: false,
      },
    })

    if (!invite) {
      const error = new Error('Invite is invalid or has expired.')
      error.status = 410
      throw error
    }

    const now = new Date()
    const timeRemaining = invite.expires_in - now

    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000
    if (timeRemaining < twoDaysInMillis) {
      invite.expires_in = new Date(invite.expires_in.getTime() + twoDaysInMillis)
      await invite.save()
    }

    const inviteBy = await models.UsersProfile.findOne({
      where: {
        user_id: invite.invited_by,
      },
      attributes: ['user_id', 'first_name', 'last_name', 'nick_name', 'avatar_url'],
    })

    invite.invited_by = inviteBy

    return invite
  }

  static async acceptInvite(invite_key, accept_user_id) {
    try {
      const invite = await models.InviteStaff.findOne({
        where: { invite_key },
      })

      if (!invite) {
        const error = new Error('Invite not found or invalid invite key')
        error.status = 404
        throw error
      }

      const user = await models.Users.findOne({
        where: { user_id: accept_user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      invite.joined = true
      invite.accept_user_id = accept_user_id

      await invite.save()

      return invite
    } catch (error) {
      throw error
    }
  }

  static async deleteInvite(invite_id) {
    try {
      const invite = await models.InviteStaff.findByPk(invite_id)

      if (!invite) {
        const error = new Error('Invite not found.')
        error.status = 404
        throw error
      }

      await invite.destroy()
    } catch (error) {
      throw this._handleError(error)
    }
  }

  static async resendInvite(invite_id, resent_by) {
    const transaction = await sequelize.transaction()

    try {
      const invite = await models.InviteStaff.findByPk(invite_id, { transaction })

      if (!invite) {
        const error = new Error('Invite not found.')
        error.status = 404
        throw error
      }

      if (invite.joined) {
        const error = new Error('Cannot resend an invite that has already been accepted.')
        error.status = 404
        throw error
      }

      if (invite.expires_in < new Date()) {
        invite.expires_in = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }

      invite.invited_again_by = resent_by
      invite.invited_again_at = new Date()
      await invite.save({ transaction })

      const role = await models.Roles.findOne({
        where: {
          role_id: invite.role_id,
        },
        transaction,
      })

      if (!role) {
        await transaction.rollback()
        const error = new Error('Role not found.')
        error.status = 404
        throw error
      }

      const inviteLink = `${process.env.SIGN_UP_PATH}/en/auth/sign-up?invite_key=${invite.invite_key}`

      const templatePath = path.join(__dirname, '../templates/invite.template.html')
      let html = await fs.readFile(templatePath, 'utf8')
      html = html.replace('{{ inviteLink }}', inviteLink).replace('{{ roleName }}', role.name)

      const subject = 'You are invited again to join a The Visual Clinic Team'

      await emailService.sendEmail({ to: invite.email, subject, html })
      await transaction.commit()
      return invite
    } catch (error) {
      await transaction.rollback()
      throw this._handleError(error)
    }
  }

  static _handleError(error) {
    error.status = error.status || 500
    return error
  }
}

module.exports = InviteStaffService
