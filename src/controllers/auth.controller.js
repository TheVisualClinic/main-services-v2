const AuthService = require('../services/auth.service')
const ResponseHandle = require('../utils/responseHandle')

class AuthController {
  static async login(req, res) {
    try {
      const { username, password, remember_me } = req.body

      if (!username || !password) {
        return ResponseHandle.error(res, 400, 'Username and Password are required')
      }

      const { accessToken, refreshToken } = await AuthService.login(
        req,
        username,
        password,
        remember_me
      )
      ResponseHandle.success(res, { accessToken, refreshToken }, 'Login successful')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async register(req, res) {
    try {
      const {
        inviteKey,
        username,
        password,
        email,
        mobile_phone,
        first_name,
        last_name,
        nick_name,
        gender,
        role_id,
      } = req.body

      if (
        !inviteKey ||
        !username ||
        !password ||
        !email ||
        !mobile_phone ||
        !first_name ||
        !last_name ||
        !nick_name ||
        !gender ||
        !role_id
      ) {
        return ResponseHandle.error(res, 400, 'All required fields must be provided')
      }

      const user = await AuthService.register(
        inviteKey,
        { username, password },
        { first_name, last_name, nick_name, gender },
        { email, mobile_phone },
        role_id
      )

      ResponseHandle.success(res, { user_id: user.user_id }, 'User registered successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async refreshToken(req, res) {
    try {
      const { token } = req.body

      if (!token) {
        return ResponseHandle.error(res, 400, 'Token is required')
      }

      const result = await AuthService.refreshToken(token, req)
      ResponseHandle.success(res, result, 'Token refreshed successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async revokeToken(req, res) {
    try {
      const { token } = req.body

      if (!token) {
        return ResponseHandle.error(res, 400, 'Token is required')
      }

      await AuthService.revokeToken(token)
      ResponseHandle.success(res, null, 'Token revoked successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async verifyAccessToken(req, res) {
    try {
      const { token } = req.body

      if (!token) {
        return ResponseHandle.error(res, 400, 'Token is required')
      }

      const decoded = AuthService.verifyAccessToken(token)
      ResponseHandle.success(res, decoded, 'Access token verified successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async resetPassword(req, res) {
    try {
      const { user_id, new_password } = req.body

      if (!user_id || !new_password) {
        return ResponseHandle.error(res, 400, 'User ID and new password are required')
      }

      const result = await AuthService.resetPassword(user_id, new_password)
      ResponseHandle.success(res, result, 'Password reset successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async forgotResetPassword(req, res) {
    try {
      const { email, otp_id, new_password } = req.body

      if (!email || !otp_id || !new_password) {
        return ResponseHandle.error(
          res,
          400,
          'Missing required fields: email, otp_id, and new_password'
        )
      }

      const result = await AuthService.forgotResetPassword(email, otp_id, new_password)
      ResponseHandle.success(res, result, 'Password reset successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }
}

module.exports = AuthController
