const UserAvatarService = require('../services/userAvatar.services')
const ResponseHandle = require('../utils/responseHandle')

class UserAvatarController {
  static async getAvatarList(req, res) {
    try {
      const avatars = await UserAvatarService.getAvatarList()
      ResponseHandle.success(res, avatars)
    } catch (error) {
      ResponseHandle.error(res, 500, 'Internal Server Error', error)
    }
  }

  static async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return ResponseHandle.error(res, 400, 'Please upload an avatar!')
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/webp',
        'image/heif',
        'image/heic',
      ]
      if (!allowedTypes.includes(req.file.mimetype)) {
        return ResponseHandle.error(
          res,
          400,
          'Invalid avatar type. Only jpg, jpeg, png, bmp, webp, heif, and heic are allowed.'
        )
      }

      const user_id = req.user?.userId

      if (!user_id) {
        return ResponseHandle.error(res, 400, 'user_id is required')
      }

      const avatar = await UserAvatarService.uploadAvatar(req.file, user_id)
      ResponseHandle.success(res, avatar, 'Avatar uploaded successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status >= 400 && error.status < 500 ? error.status : 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async changeAvatar(req, res) {
    try {
      const { avatar_id } = req.body
      const avatar = req.file

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/webp',
        'image.heif',
        'image/heic',
      ]
      if (!avatar || !allowedTypes.includes(avatar.mimetype)) {
        return ResponseHandle.error(
          res,
          400,
          'Invalid avatar type. Only jpg, jpeg, png, bmp, webp, heif, and heic are allowed.'
        )
      }

      if (!avatar_id) {
        return ResponseHandle.error(res, 400, 'avatar_id and new avatar are required')
      }

      const updatedAvatar = await UserAvatarService.changeAvatar(avatar_id, avatar)
      ResponseHandle.success(res, updatedAvatar, 'Avatar changed successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status >= 400 && error.status < 500 ? error.status : 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async permanentlyDeleteAvatar(req, res) {
    try {
      const { avatar_id } = req.body

      if (!avatar_id) {
        return ResponseHandle.error(res, 400, 'avatar_id is required!')
      }

      await UserAvatarService.permanentlyDeleteAvatar(avatar_id)
      ResponseHandle.success(res, null, 'Avatar permanently deleted successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status >= 400 && error.status < 500 ? error.status : 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }
}

module.exports = UserAvatarController
