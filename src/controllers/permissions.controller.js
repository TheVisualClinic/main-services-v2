const PermissionsService = require('../services/permissions.service')
const ResponseHandle = require('../utils/responseHandle')

class PermissionsController {
  static async getPermissionsList(req, res) {
    try {
      const permissionsList = await PermissionsService.getPermissionsList()
      ResponseHandle.success(res, permissionsList, 'Permissions retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getPermissionById(req, res) {
    try {
      const { permission_id } = req.params

      if (!permission_id) {
        return ResponseHandle.error(res, 400, 'Permission ID is required')
      }

      const permission = await PermissionsService.getPermissionById(permission_id)

      if (!permission) {
        return ResponseHandle.error(res, 404, 'Permission not found')
      }

      ResponseHandle.success(res, permission, 'Permission retrieved successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createPermission(req, res) {
    try {
      const data = req.body

      if (!data || Object.keys(data).length === 0) {
        return ResponseHandle.error(res, 400, 'Permission data is required')
      }

      const permission = await PermissionsService.createPermission(data)
      ResponseHandle.success(res, permission, 'Permission created successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async updatePermission(req, res) {
    try {
      const { permission_id, ...data } = req.body

      if (!permission_id) {
        return ResponseHandle.error(res, 400, 'Permission ID is required')
      }

      const updatedPermission = await PermissionsService.updatePermission(permission_id, data)

      if (!updatedPermission) {
        return ResponseHandle.error(res, 404, 'Permission not found')
      }

      ResponseHandle.success(res, updatedPermission, 'Permission updated successfully')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deletePermission(req, res) {
    try {
      const { permission_id } = req.params

      if (!permission_id) {
        return ResponseHandle.error(res, 400, 'Permission ID is required')
      }

      await PermissionsService.deletePermission(permission_id)
      ResponseHandle.success(res, null, 'Permission deleted successfully')
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

module.exports = PermissionsController
