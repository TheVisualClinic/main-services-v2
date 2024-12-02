const RolesService = require('../services/roles.service')
const ResponseHandle = require('../utils/responseHandle')

class RolesController {
  static async getRolesList(req, res) {
    try {
      const rolesList = await RolesService.getRolesList()
      ResponseHandle.success(res, rolesList, 'Roles retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getRoleById(req, res) {
    try {
      const { role_id } = req.params

      if (!role_id) {
        return ResponseHandle.error(res, 400, 'Role ID is required')
      }

      const role = await RolesService.getRoleById(role_id)

      if (!role) {
        return ResponseHandle.error(res, 404, 'Role not found')
      }

      ResponseHandle.success(res, role, 'Role retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createRole(req, res) {
    try {
      const data = req.body

      if (!data || !data.name) {
        return ResponseHandle.error(res, 400, 'Role name is required')
      }

      const role = await RolesService.createRole(data)
      ResponseHandle.success(res, role, 'Role created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updateRole(req, res) {
    try {
      const { role_id, name } = req.body

      if (!role_id || !name) {
        return ResponseHandle.error(res, 400, 'Role ID and name are required')
      }

      const updatedRole = await RolesService.updateRole(role_id, { name })

      if (!updatedRole) {
        return ResponseHandle.error(res, 404, 'Role not found')
      }

      ResponseHandle.success(res, updatedRole, 'Role updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteRole(req, res) {
    try {
      const { role_id } = req.params

      if (!role_id) {
        return ResponseHandle.error(res, 400, 'Role ID is required')
      }

      await RolesService.deleteRole(role_id)
      ResponseHandle.success(res, null, 'Role deleted successfully')
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

module.exports = RolesController
