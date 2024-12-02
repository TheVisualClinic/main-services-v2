const express = require('express')
const PermissionsController = require('../controllers/permissions.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management
 */

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permissions'
 */
router.get('/', verifyAccessToken, PermissionsController.getPermissionsList)

/**
 * @swagger
 * /api/permissions/{permission_id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permission_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the permission to retrieve
 *     responses:
 *       200:
 *         description: Permission retrieved successfully
 *       404:
 *         description: Permission not found
 */
router.get('/:permission_id', verifyAccessToken, PermissionsController.getPermissionById)

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_en:
 *                 type: string
 *                 example: "create project"
 *               name_th:
 *                 type: string
 *                 example: "สร้างโปรเจค"
 *               description_en:
 *                 type: string
 *                 example: "Permission to create a new project."
 *               description_th:
 *                 type: string
 *                 example: "สิทธิ์ในการสร้างโปรเจคใหม่."
 *               tag:
 *                 type: string
 *                 example: "project"
 *             required:
 *               - name_en
 *               - name_th
 *               - description_en
 *               - description_th
 *               - tag
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/', verifyAccessToken, PermissionsController.createPermission)

/**
 * @swagger
 * /api/permissions:
 *   put:
 *     summary: Update an existing permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permission_id:
 *                 type: integer
 *                 example: 1
 *               name_en:
 *                 type: string
 *                 example: "edit project"
 *               name_th:
 *                 type: string
 *                 example: "แก้ไขโปรเจค"
 *               description_en:
 *                 type: string
 *                 example: "Permission to edit an existing project."
 *               description_th:
 *                 type: string
 *                 example: "สิทธิ์ในการแก้ไขโปรเจคที่มีอยู่."
 *               tag:
 *                 type: string
 *                 example: "project"
 *             required:
 *               - permission_id
 *               - name_en
 *               - name_th
 *               - description_en
 *               - description_th
 *               - tag
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       404:
 *         description: Permission not found
 *       400:
 *         description: Bad Request
 */
router.put('/', verifyAccessToken, PermissionsController.updatePermission)

/**
 * @swagger
 * /api/permissions/{permission_id}:
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permission_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the permission to delete
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */
router.delete('/:permission_id', verifyAccessToken, PermissionsController.deletePermission)

module.exports = router
