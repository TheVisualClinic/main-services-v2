const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { models } = require('../models')

class UserAvatarService {
  static sanitizeFileName(fileName) {
    return fileName
      .replace(/[^a-zA-Z0-9ก-ฮะ-์._-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  static deleteEmptyDirectories(dir) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      if (files.length === 0) {
        fs.rmdirSync(dir)
        const parentDir = path.dirname(dir)
        this.deleteEmptyDirectories(parentDir)
      }
    }
  }

  static async getAvatarList() {
    try {
      const avatars = await models.UserAvatars.findAll()
      return avatars
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async uploadAvatar(avatar, user_id) {
    try {
      const uploadsDir = 'src/uploads'
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const dir = path.join(uploadsDir, 'avatar')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const sanitizedFileName = this.sanitizeFileName(user_id)
      const randomFourDigits = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
      const avatarName = `${sanitizedFileName}-${randomFourDigits}.webp`
      const avatarPath = path.join(dir, avatarName)

      if (fs.existsSync(avatarPath)) {
        const error = new Error('Avatar with the same name already exists.')
        error.status = 409
        throw error
      }

      await sharp(avatar.buffer)
        .resize({
          width: 800,
          height: 800,
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 90 })
        .toFile(avatarPath)

      const avatarUrl = `/avatar/${avatarName}`
      const newAvatar = await models.UserAvatars.create({
        user_id,
        avatar_url: avatarUrl,
        avatar_path: avatarPath,
      })

      return {
        avatar_id: newAvatar.avatar_id,
        avatar_url: newAvatar.avatar_url,
      }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async changeAvatar(avatar_id, newAvatar) {
    try {
      const oldAvatar = await models.UserAvatars.findOne({
        where: {
          avatar_id: avatar_id,
        },
      })

      if (!oldAvatar) {
        const error = new Error('Avatar not found')
        error.status = 404
        throw error
      }

      const oldAvatarPath = oldAvatar.avatar_path
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath)
      }

      const sanitizedFileName = this.sanitizeFileName(oldAvatar.user_id)
      const randomFourDigits = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
      const newAvatarName = `${sanitizedFileName}-${randomFourDigits}.webp`
      const newAvatarPath = path.join('src/uploads/avatar', newAvatarName)
      const avatarUrl = `/avatar/${newAvatarName}`

      await sharp(newAvatar.buffer)
        .resize({
          width: 800,
          height: 800,
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 90 })
        .toFile(newAvatarPath)

      await models.UserAvatars.update(
        {
          avatar_url: avatarUrl,
          avatar_path: newAvatarPath,
          user_id: oldAvatar.user_id,
        },
        {
          where: {
            avatar_id: oldAvatar.avatar_id,
          },
        }
      )

      const updatedAvatar = await models.UserAvatars.findByPk(oldAvatar.avatar_id)

      return updatedAvatar
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async permanentlyDeleteAvatar(avatar_id) {
    try {
      const avatar = await models.UserAvatars.findByPk(avatar_id)
      if (!avatar) {
        const error = new Error('Avatar not found')
        error.status = 404
        throw error
      }

      const avatarPath = avatar.avatar_path
      const dirPath = path.dirname(avatarPath)

      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath)
      }

      await avatar.destroy({ force: true })

      this.deleteEmptyDirectories(dirPath)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = UserAvatarService
