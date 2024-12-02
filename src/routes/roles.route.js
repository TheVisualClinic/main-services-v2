const express = require('express')
const RolesController = require('../controllers/roles.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', verifyAccessToken, RolesController.getRolesList)

/**
 * @swagger
 * /api/roles/{role_id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role to retrieve
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *       404:
 *         description: Role not found
 */
router.get('/:role_id', verifyAccessToken, RolesController.getRoleById)

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Administrator"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/', verifyAccessToken, RolesController.createRole)

/**
 * @swagger
 * /api/roles:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Administrator"
 *             required:
 *               - role_id
 *               - name
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       400:
 *         description: Bad Request
 */
router.put('/', verifyAccessToken, RolesController.updateRole)

/**
 * @swagger
 * /api/roles/{role_id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:role_id', verifyAccessToken, RolesController.deleteRole)

module.exports = router
