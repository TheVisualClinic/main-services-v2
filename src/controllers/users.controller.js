const UserService = require('../services/users.service')
const ResponseHandle = require('../utils/responseHandle')

class UsersController {
  static async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers()
      ResponseHandle.success(res, users, 'Users retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createUser(req, res) {
    try {
      const {
        username,
        password,
        first_name,
        last_name,
        nick_name,
        gender,
        email,
        mobile_phone,
        role_id,
      } = req.body

      if (
        !username ||
        !password ||
        !first_name ||
        !last_name ||
        !gender ||
        !email ||
        !mobile_phone ||
        !role_id
      ) {
        return ResponseHandle.error(res, 400, 'Missing required fields')
      }

      const result = await UserService.createUser({
        username,
        password,
        first_name,
        last_name,
        nick_name,
        gender,
        email,
        mobile_phone,
        role_id,
      })

      ResponseHandle.success(res, result, 'User created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteUser(req, res) {
    try {
      const { user_id } = req.query

      if (!user_id) {
        return ResponseHandle.error(res, 400, 'Missing user_id')
      }

      const result = await UserService.deleteUser(user_id)
      ResponseHandle.success(res, result, 'User deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.query

      if (!id) {
        return ResponseHandle.error(res, 400, 'User ID is required')
      }

      const user = await UserService.getProfile(id)
      ResponseHandle.success(res, user, 'User retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getMyProfile(req, res) {
    try {
      const { userId } = req.user

      if (!userId) {
        return ResponseHandle.error(res, 400, 'User ID is required')
      }

      const user = await UserService.getProfile(userId)
      ResponseHandle.success(res, user, 'User retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateProfile(req, res) {
    try {
      const { user_id, first_name, last_name, nick_name, gender } = req.body

      if (!user_id || !first_name || !last_name || !nick_name) {
        return ResponseHandle.error(
          res,
          400,
          'Missing required fields: user_id, first_name, last_name, or nick_name'
        )
      }

      const profileData = { first_name, last_name, nick_name, gender }
      await UserService.updateUserProfile(user_id, profileData)
      ResponseHandle.success(res, null, 'User profile updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateContact(req, res) {
    try {
      const { user_id, email, mobile_phone } = req.body

      if (!user_id || !email || !mobile_phone) {
        return ResponseHandle.error(
          res,
          400,
          'Missing required fields: user_id, email, or mobile_phone'
        )
      }

      const contactData = { email, mobile_phone }
      await UserService.updateUserContact(user_id, contactData)
      ResponseHandle.success(res, null, 'User contact updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateUserAvatar(req, res) {
    try {
      const { user_id, avatar_id, avatar_url } = req.body

      if (!user_id || !avatar_id || !avatar_url) {
        return ResponseHandle.error(
          res,
          400,
          'Missing required fields: user_id, avatar_id, or avatar_url'
        )
      }

      await UserService.updateUserAvatar(user_id, avatar_id, avatar_url)
      ResponseHandle.success(res, null, 'User avatar updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async suspendedUser(req, res) {
    try {
      const { user_id } = req.body

      if (!user_id) {
        return ResponseHandle.error(res, 400, 'Missing user_id')
      }

      const result = await UserService.suspendedUser(user_id)
      ResponseHandle.success(res, result, 'User suspended successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async activeUser(req, res) {
    try {
      const { user_id } = req.body

      if (!user_id) {
        return ResponseHandle.error(res, 400, 'Missing user_id')
      }

      const result = await UserService.activeUser(user_id)
      ResponseHandle.success(res, result, 'User activated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async changeUserRole(req, res) {
    try {
      const { user_id, role_id } = req.body

      if (!user_id || !role_id) {
        return ResponseHandle.error(res, 400, 'Missing required fields: user_id or role_id')
      }

      const result = await UserService.changeUserRole(user_id, role_id)
      ResponseHandle.success(res, result, 'User role updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async changeUserPermission(req, res) {
    try {
      const { user_id, permission_ids } = req.body

      if (!user_id || !Array.isArray(permission_ids) || permission_ids.length === 0) {
        return ResponseHandle.error(
          res,
          400,
          'Missing required fields: user_id or permission_ids (non-empty array)'
        )
      }

      const result = await UserService.changeUserPermission(user_id, permission_ids)
      ResponseHandle.success(res, result, 'User permissions updated successfully')
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

module.exports = UsersController
