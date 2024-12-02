const { models } = require('../models')

class RolesService {
  static async getRolesList() {
    try {
      return await models.Roles.findAll()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getRoleById(role_id) {
    try {
      return await models.Roles.findByPk(role_id)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async createRole(data) {
    try {
      return await models.Roles.create(data)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateRole(role_id, data) {
    try {
      const role = await models.Roles.findByPk(role_id)
      if (!role) {
        const error = new Error('Role not found')
        error.status = 404
        throw error
      }
      return await role.update(data)
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteRole(role_id) {
    try {
      const role = await models.Roles.findByPk(role_id)
      if (!role) {
        const error = new Error('Role not found')
        error.status = 404
        throw error
      }
      return await role.destroy()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = RolesService
