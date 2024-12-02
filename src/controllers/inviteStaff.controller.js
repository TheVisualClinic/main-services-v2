const InviteStaffService = require('../services/inviteStaff.service')
const ResponseHandle = require('../utils/responseHandle')
const emailValidator = require('email-validator')

class InviteStaffController {
  static async getInviteList(req, res) {
    try {
      const inviteList = await InviteStaffService.getInviteList()
      ResponseHandle.success(res, inviteList, 'Success')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async getInviteJoinedList(req, res) {
    try {
      const inviteJoinedList = await InviteStaffService.getInviteJoinedList()
      ResponseHandle.success(res, inviteJoinedList, 'Success')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async createInvite(req, res) {
    try {
      const invited_by = req.user.userId
      const { email, role_id } = req.body

      if (!email || !role_id) {
        return ResponseHandle.error(res, 400, 'Email and Role ID are required')
      }

      if (!emailValidator.validate(email)) {
        return ResponseHandle.error(res, 422, 'Invalid email format')
      }

      const newInvite = await InviteStaffService.createInvite({ email, role_id, invited_by })
      ResponseHandle.created(res, newInvite, 'Invitation created successfully.')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async validateInvite(req, res) {
    try {
      const { invite_key } = req.params

      if (!invite_key) {
        return ResponseHandle.error(res, 400, 'Invite key is required')
      }

      const invite = await InviteStaffService.validateInvite(invite_key)
      ResponseHandle.success(res, invite, 'Invitation is valid.')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async acceptInvite(req, res) {
    try {
      const { invite_key, user_id } = req.body

      if (!invite_key || !user_id) {
        return ResponseHandle.error(res, 400, 'Invite key and User ID are required')
      }

      await InviteStaffService.acceptInvite(invite_key, user_id)
      ResponseHandle.success(res, null, 'Invitation accepted successfully.')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async deleteInvite(req, res) {
    try {
      const { invite_id } = req.params

      if (!invite_id) {
        return ResponseHandle.error(res, 400, 'Invite ID is required')
      }

      await InviteStaffService.deleteInvite(invite_id)
      ResponseHandle.success(res, null, 'Invitation deleted successfully.')
    } catch (error) {
      ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error',
        error
      )
    }
  }

  static async resendInvite(req, res) {
    try {
      const { invite_id } = req.body
      const resent_by = req.user.userId

      if (!invite_id) {
        return ResponseHandle.error(res, 400, 'Invite ID is required')
      }

      const invite = await InviteStaffService.resendInvite(invite_id, resent_by)
      ResponseHandle.success(res, invite, 'Invitation resent successfully.')
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

module.exports = InviteStaffController
