const { models, sequelize } = require('../models')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')

class UserService {
  static async getAllUsers() {
    try {
      const users = await models.Users.findAll({
        attributes: ['user_id', 'username', 'user_status', 'created_at'],
      })

      const result = await Promise.all(
        users.map(async (user) => {
          const [profile, contact, userRole] = await Promise.all([
            models.UsersProfile.findOne({
              where: { user_id: user.user_id },
              attributes: ['first_name', 'last_name', 'nick_name', 'gender', 'avatar_url'],
            }),
            models.UsersContact.findOne({
              where: { user_id: user.user_id },
              attributes: ['email', 'mobile_phone'],
            }),
            models.UserRole.findOne({
              where: { user_id: user.user_id },
              attributes: ['role_id'],
            }),
          ])

          const role = userRole
            ? await models.Roles.findOne({
                where: { role_id: userRole.role_id },
                attributes: ['role_id', 'name'],
              })
            : null

          return {
            ...user.toJSON(),
            profile: profile ? profile.toJSON() : null,
            contact: contact ? contact.toJSON() : null,
            role: role
              ? {
                  role_id: role.role_id,
                  name: role.name,
                }
              : null,
          }
        })
      )

      return result
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async createUser({
    username,
    password,
    first_name,
    last_name,
    nick_name,
    gender,
    email,
    mobile_phone,
    role_id,
  }) {
    const transaction = await sequelize.transaction()

    try {
      const existingUser = await models.Users.findOne({
        where: { username },
      })

      if (existingUser) {
        const error = new Error('Username already taken')
        error.status = 409
        throw error
      }

      const hashedPassword = await bcryptjs.hash(password, 10)

      const user = await models.Users.create(
        {
          username,
          password: hashedPassword,
        },
        { transaction }
      )

      await models.UsersProfile.create(
        {
          user_id: user.user_id,
          first_name,
          last_name,
          nick_name,
          gender,
        },
        { transaction }
      )

      await models.UsersContact.create(
        {
          user_id: user.user_id,
          email,
          mobile_phone,
        },
        { transaction }
      )

      await models.UserRole.create(
        {
          user_id: user.user_id,
          role_id,
        },
        { transaction }
      )

      const permissionFilter =
        role_id === 1 || role_id === 2
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

      return { message: 'User is Created.' }
    } catch (error) {
      await transaction.rollback()
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async deleteUser(user_id) {
    const transaction = await sequelize.transaction()
    try {
      const user = await models.Users.findOne({
        where: { user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      await models.UsersProfile.destroy({ where: { user_id }, transaction })
      await models.UsersContact.destroy({ where: { user_id }, transaction })
      await models.UserRole.destroy({ where: { user_id }, transaction })
      await models.UserPermission.destroy({ where: { user_id }, transaction })
      await models.RefreshToken.destroy({ where: { user_id }, transaction })

      await models.Users.destroy({ where: { user_id }, transaction })

      await transaction.commit()

      return { message: 'User is Deleted.' }
    } catch (error) {
      await transaction.rollback()
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async getProfile(user_id) {
    try {
      const user = await models.Users.findOne({
        where: { user_id },
        attributes: ['user_id', 'username', 'user_status', 'created_at'],
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const [profile, contact, userRole, userPermissions] = await Promise.all([
        models.UsersProfile.findOne({
          where: { user_id },
          attributes: [
            'user_id',
            'first_name',
            'last_name',
            'nick_name',
            'gender',
            'avatar_id',
            'avatar_url',
          ],
        }),
        models.UsersContact.findOne({
          where: { user_id },
          attributes: ['user_id', 'email', 'mobile_phone'],
        }),
        models.UserRole.findOne({
          where: { user_id },
          attributes: ['role_id'],
        }),
        models.UserPermission.findAll({
          where: { user_id },
          attributes: ['permission_id'],
        }),
      ])

      const role = userRole
        ? await models.Roles.findOne({
            where: { role_id: userRole.role_id },
            attributes: ['role_id', 'name'],
          })
        : null

      const permissions = userPermissions.length
        ? await models.Permissions.findAll({
            where: {
              permission_id: userPermissions.map((perm) => perm.permission_id),
            },
            attributes: ['permission_id', 'name_en'],
          })
        : []

      return {
        ...user.toJSON(),
        profile: profile ? (({ user_id, ...rest }) => rest)(profile.toJSON()) : null,
        contact: contact ? (({ user_id, ...rest }) => rest)(contact.toJSON()) : null,
        role: role
          ? {
              role_id: role.role_id,
              name: role.name,
            }
          : null,
        permissions: permissions.map((perm) => ({
          permission_id: perm.permission_id,
          name_en: perm.name_en,
        })),
      }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateUserProfile(user_id, profileData) {
    try {
      const profile = await models.UsersProfile.findOne({
        where: { user_id },
      })

      if (!profile) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const sanitizedProfileData = Object.fromEntries(
        Object.entries(profileData).map(([key, value]) => [key, value === '' ? null : value])
      )

      const updatedProfile = await profile.update(sanitizedProfileData)

      return updatedProfile.toJSON()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateUserContact(user_id, contactData) {
    try {
      const contact = await models.UsersContact.findOne({
        where: { user_id },
      })

      if (!contact) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const sanitizedContactData = Object.fromEntries(
        Object.entries(contactData).map(([key, value]) => [key, value === '' ? null : value])
      )

      const updatedContact = await contact.update(sanitizedContactData)

      return updatedContact.toJSON()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async updateUserAvatar(user_id, avatar_id, avatar_url) {
    try {
      const userProfile = await models.UsersProfile.findOne({
        where: { user_id },
      })

      if (!userProfile) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const updatedUserProfile = await userProfile.update({
        avatar_id,
        avatar_url,
      })

      return updatedUserProfile.toJSON()
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async suspendedUser(user_id) {
    try {
      const user = await models.Users.findOne({
        where: { user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const refreshTokens = await models.RefreshToken.findAll({
        where: { user_id },
      })

      if (refreshTokens && refreshTokens.length > 0) {
        await models.RefreshToken.destroy({
          where: { user_id },
        })
      }

      await user.update({
        user_status: 'suspended',
      })

      return { message: 'User suspended successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async activeUser(user_id) {
    try {
      const user = await models.Users.findOne({
        where: { user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      await user.update({
        user_status: 'active',
      })

      return { message: 'User active successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async changeUserRole(user_id, new_role_id) {
    try {
      const user = await models.Users.findOne({
        where: { user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const role = await models.Roles.findOne({
        where: { role_id: new_role_id },
      })

      if (!role) {
        const error = new Error('Role not found')
        error.status = 404
        throw error
      }

      await models.UserRole.destroy({
        where: { user_id },
      })

      await models.UserRole.create({
        user_id,
        role_id: new_role_id,
      })

      return { message: 'User role updated successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }

  static async changeUserPermission(user_id, new_permission_ids) {
    try {
      const user = await models.Users.findOne({
        where: { user_id },
      })

      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }

      const permissions = await models.Permissions.findAll({
        where: { permission_id: new_permission_ids },
      })

      if (permissions.length !== new_permission_ids.length) {
        const error = new Error('Some permissions not found')
        error.status = 404
        throw error
      }

      await models.UserPermission.destroy({
        where: { user_id },
      })

      const userPermissions = new_permission_ids.map((permission_id) => ({
        user_id,
        permission_id,
      }))

      await models.UserPermission.bulkCreate(userPermissions)

      return { message: 'User permissions updated successfully' }
    } catch (error) {
      if (!error.status) error.status = 500
      throw error
    }
  }
}

module.exports = UserService
