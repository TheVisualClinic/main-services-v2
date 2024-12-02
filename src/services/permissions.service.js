const { models } = require('../models')

class PermissionsService {
  static async getPermissionsList() {
    try {
      return await models.Permissions.findAll()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getPermissionById(permission_id) {
    try {
      return await models.Permissions.findByPk(permission_id)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async createPermission(data) {
    try {
      return await models.Permissions.create(data)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updatePermission(permission_id, data) {
    try {
      const permission = await models.Permissions.findByPk(permission_id)
      if (!permission) {
        const error = new Error('Permission not found')
        error.status = 404
        throw error
      }
      return await permission.update(data)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deletePermission(permission_id) {
    try {
      const permission = await models.Permissions.findByPk(permission_id)
      if (!permission) {
        const error = new Error('Permission not found')
        error.status = 404
        throw error
      }
      return await permission.destroy()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = PermissionsService
