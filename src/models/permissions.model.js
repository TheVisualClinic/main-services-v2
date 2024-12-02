const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.config')

/**
 * @swagger
 * components:
 *   schemas:
 *     Permissions:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the permission.
 *           example: 1
 *         name_en:
 *           type: string
 *           description: The name of the permission in English.
 *           example: "create project"
 *         name_th:
 *           type: string
 *           description: The name of the permission in Thai.
 *           example: "สร้างโปรเจค"
 *         description_en:
 *           type: string
 *           description: A brief description of the permission in English.
 *           example: "Permission to create a new project."
 *         description_th:
 *           type: string
 *           description: A brief description of the permission in Thai.
 *           example: "สิทธิ์ในการสร้างโปรเจคใหม่."
 *         tag:
 *           type: string
 *           description: The tag categorizing the permission.
 *           example: "project"
 *       required:
 *         - id
 *         - name_en
 *         - name_th
 *         - description_en
 *         - description_th
 *         - tag
 *       example:
 *         id: 1
 *         name_en: "create project"
 *         name_th: "สร้างโปรเจค"
 *         description_en: "Permission to create a new project."
 *         description_th: "สิทธิ์ในการสร้างโปรเจคใหม่."
 *         tag: "project"
 */

class Permissions extends Model {}

Permissions.init(
  {
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name_en: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name_th: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description_en: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description_th: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Permissions',
    tableName: 'permissions',
    timestamps: false,
    paranoid: false,
    hooks: {
      afterSync: async () => {
        const count = await Permissions.count()
        if (count === 0) {
          const permissions = [
            {
              name_en: 'create blog post',
              name_th: 'สร้างบทความ',
              description_en: 'Permission to create a new blog post.',
              description_th: 'สิทธิ์ในการสร้างบทความใหม่.',
              tag: 'blog',
            },
            {
              name_en: 'edit blog post',
              name_th: 'แก้ไขบทความ',
              description_en: 'Permission to edit an existing blog post.',
              description_th: 'สิทธิ์ในการแก้ไขบทความที่มีอยู่.',
              tag: 'blog',
            },
            {
              name_en: 'delete blog post',
              name_th: 'ลบบทความ',
              description_en: 'Permission to delete an existing blog post.',
              description_th: 'สิทธิ์ในการลบบทความที่มีอยู่.',
              tag: 'blog',
            },
            {
              name_en: 'create category',
              name_th: 'สร้างหมวดหมู่',
              description_en: 'Permission to create a new category.',
              description_th: 'สิทธิ์ในการสร้างหมวดหมู่ใหม่.',
              tag: 'category',
            },
            {
              name_en: 'edit category',
              name_th: 'แก้ไขหมวดหมู่',
              description_en: 'Permission to edit an existing category.',
              description_th: 'สิทธิ์ในการแก้ไขหมวดหมู่ที่มีอยู่.',
              tag: 'category',
            },
            {
              name_en: 'delete category',
              name_th: 'ลบหมวดหมู่',
              description_en: 'Permission to delete an existing category.',
              description_th: 'สิทธิ์ในการลบหมวดหมู่ที่มีอยู่.',
              tag: 'category',
            },
            {
              name_en: 'invite team member',
              name_th: 'เชิญสมาชิกทีม',
              description_en: 'Permission to invite new team members.',
              description_th: 'สิทธิ์ในการเชิญสมาชิกใหม่เข้าทีม.',
              tag: 'team',
            },
            {
              name_en: 'remove team member',
              name_th: 'ลบสมาชิกทีม',
              description_en: 'Permission to remove existing team members.',
              description_th: 'สิทธิ์ในการลบสมาชิกทีมที่มีอยู่.',
              tag: 'team',
            },
            {
              name_en: 'assign team roles',
              name_th: 'มอบหมายบทบาททีม',
              description_en: 'Permission to assign roles to team members.',
              description_th: 'สิทธิ์ในการมอบหมายบทบาทให้สมาชิกทีม.',
              tag: 'team',
            },
            {
              name_en: 'edit team roles',
              name_th: 'แก้ไขบทบาททีม',
              description_en: 'Permission to edit the roles of existing team members.',
              description_th: 'สิทธิ์ในการแก้ไขบทบาทของสมาชิกทีม.',
              tag: 'team',
            },
            {
              name_en: 'edit website content',
              name_th: 'แก้ไขเนื้อหาเว็บไซต์',
              description_en: 'Permission to edit the content on the website.',
              description_th: 'สิทธิ์ในการแก้ไขเนื้อหาบนเว็บไซต์.',
              tag: 'website',
            },
          ]

          for (const permission of permissions) {
            await Permissions.create(permission)
          }
        }
      },
    },
  }
)

module.exports = Permissions
