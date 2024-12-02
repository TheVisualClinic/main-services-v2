const { models, sequelize } = require('../models')
const { Op, where } = require('sequelize')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthService {
  static async login(req, username, password, remember_me) {
    try {
      const user = await models.Users.findOne({ where: { username } })
      if (!user) {
        const error = new Error('Incorrect username or password')
        error.status = 401
        throw error
      }

      const validPassword = user && (await bcryptjs.compare(password, user.password))
      if (!validPassword) {
        const error = new Error('Incorrect username or password')
        error.status = 401
        throw error
      }

      const role = await models.UserRole.findOne({ where: { user_id: user.user_id } })
      const permissions = await models.UserPermission.findAll({ where: { user_id: user.user_id } })

      const { accessToken, refreshToken } = await AuthService.generateTokens(
        req,
        user,
        role,
        permissions,
        remember_me
      )
      return { accessToken, refreshToken }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async register(inviteKey, userData, userProfile, userContact, userRole) {
    const transaction = await sequelize.transaction()
    try {
      const checkInviteKey = await models.InviteStaff.findOne({
        where: {
          invite_key: inviteKey,
          expires_in: { [Op.gt]: new Date() },
          joined: false,
        },
      })

      if (!checkInviteKey) {
        const error = new Error('Invalid or expired invite key')
        error.status = 409
        throw error
      }

      const existingUser = await models.Users.findOne({
        where: { username: userData.username },
      })

      if (existingUser) {
        const error = new Error('Username already taken')
        error.status = 409
        throw error
      }

      const hashedPassword = await bcryptjs.hash(userData.password, 10)
      const user = await models.Users.create(
        {
          username: userData.username,
          password: hashedPassword,
        },
        { transaction }
      )

      await models.UsersProfile.create(
        {
          user_id: user.user_id,
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          nick_name: userProfile.nick_name,
          gender: userProfile.gender,
        },
        { transaction }
      )

      await models.UsersContact.create(
        {
          user_id: user.user_id,
          email: userContact.email,
          mobile_phone: userContact.mobile_phone,
        },
        { transaction }
      )

      await models.UserRole.create(
        {
          user_id: user.user_id,
          role_id: userRole,
        },
        { transaction }
      )

      const permissionFilter =
        userRole === 1 || userRole === 2
          ? {}
          : {
              tag: { [Op.ne]: 'team' },
            }

      const permissionList = await models.Permissions.findAll({
        where: permissionFilter,
      })

      const userPermissions = permissionList.map((permission) => ({
        user_id: user.user_id,
        permission_id: permission.permission_id,
      }))

      await models.UserPermission.bulkCreate(userPermissions, { transaction })

      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async refreshToken(token, req) {
    try {
      const existingRefreshToken = await models.RefreshToken.findOne({ where: { token } })
      if (!existingRefreshToken) {
        const error = new Error('Invalid refresh token')
        error.status = 401
        throw error
      }

      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

      const currentTime = Math.floor(Date.now() / 1000)
      const tenHoursInSeconds = 10 * 60 * 60

      let newRefreshToken = null

      if (decoded.exp - currentTime < tenHoursInSeconds) {
        newRefreshToken = await this.renewRefreshToken(token, req)
      }

      const accessToken = jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
      )

      return { accessToken, refreshToken: newRefreshToken }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async revokeToken(token) {
    try {
      const existingToken = await models.RefreshToken.findOne({ where: { token } })
      if (!existingToken) {
        const error = new Error('Invalid refresh token')
        error.status = 401
        throw error
      }

      await models.RefreshToken.destroy({ where: { token } })
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async generateTokens(req, user, role, permissions, remember_me) {
    try {
      const accessToken = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
      )

      const permissionsScope = permissions.map((item) => item.permission_id)
      const refreshToken = jwt.sign(
        {
          userId: user.user_id,
          username: user.username,
          role: role.role_id || null,
          permissions: permissionsScope.toString() || null,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: remember_me
            ? process.env.REFRESH_TOKEN_EXPIRES_LONG
            : process.env.REFRESH_TOKEN_EXPIRES_SHOT,
        }
      )

      await models.RefreshToken.create({
        token: refreshToken,
        user_id: user.user_id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ip_address: req.ip,
        user_agent: req.headers['user-agent'],
      })

      return { accessToken, refreshToken }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      return decoded
    } catch (error) {
      const err = new Error('Invalid access token')
      err.status = 401
      throw err
    }
  }

  static async renewRefreshToken(token, req) {
    try {
      const existingToken = await models.RefreshToken.findOne({ where: { token } })
      if (!existingToken) {
        const error = new Error('Invalid refresh token')
        error.status = 401
        throw error
      }

      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
      const newRefreshToken = jwt.sign(
        {
          userId: decoded.userId,
          username: decoded.username,
          role: decoded.role,
          permissions: decoded.permissions,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_LONG }
      )

      existingToken.token = newRefreshToken
      existingToken.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      existingToken.ip_address = req.ip
      existingToken.user_agent = req.headers['user-agent']
      await existingToken.save()

      return newRefreshToken
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async resetPassword(user_id, new_password) {
    try {
      const user = await models.Users.findOne({ where: { user_id } })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const isPasswordMatch = await bcryptjs.compare(new_password, user.password)
      if (isPasswordMatch) {
        const error = new Error('New password cannot be the same as the old password')
        error.status = 400
        throw error
      }

      const hashedPassword = await bcryptjs.hash(new_password, 10)
      await user.update({ password: hashedPassword })

      return { message: 'Password reset successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async forgotResetPassword(email, otp_id, new_password) {
    try {
      const user = await models.Users.findOne({
        where: {
          username: email,
        },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const otpHistory = await models.OTPHistory.findOne({
        where: { otp_id, email, is_used: true },
      })

      if (!otpHistory) {
        const error = new Error('OTP History not Confirmed')
        error.status = 404
        throw error
      }

      const isPasswordMatch = await bcryptjs.compare(new_password, user.password)
      if (isPasswordMatch) {
        const error = new Error('New password cannot be the same as the old password')
        error.status = 400
        throw error
      }

      const hashedPassword = await bcryptjs.hash(new_password, 10)
      await user.update({ password: hashedPassword })

      return { message: 'Password reset successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = AuthService
