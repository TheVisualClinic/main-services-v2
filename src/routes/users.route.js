const express = require('express')
const UsersController = require('../controllers/users.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */
router.get('/', verifyAccessToken, UsersController.getAll)

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user
 *     description: Creates a new user with the provided details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - first_name
 *               - last_name
 *               - gender
 *               - email
 *               - mobile_phone
 *               - role_id
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: "SecureP@ss123"
 *               first_name:
 *                 type: string
 *                 description: The user's first name
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Doe"
 *               nick_name:
 *                 type: string
 *                 description: The user's nickname
 *                 example: "Johnny"
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *                 example: "male"
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "john.doe@example.com"
 *               mobile_phone:
 *                 type: string
 *                 description: The user's mobile phone number
 *                 example: "+123456789"
 *               role_id:
 *                 type: integer
 *                 description: The role ID assigned to the user
 *                 example: 2
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created user
 *                       example: "12345"
 *                     username:
 *                       type: string
 *                       description: The username of the newly created user
 *                       example: "john_doe"
 */
router.post('/create', verifyAccessToken, UsersController.createUser)

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user based on the user ID provided as a query parameter.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *         example: "user-id"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 */
router.delete('/', verifyAccessToken, UsersController.deleteUser)

/**
 * @swagger
 * /api/users/by:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 */
router.get('/by', verifyAccessToken, UsersController.getById)

/**
 * @swagger
 * /api/users/my-profile:
 *   get:
 *     summary: Retrieve the profile of the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A single user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 */
router.get('/my-profile', verifyAccessToken, UsersController.getMyProfile)

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               nick_name:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Updated user profile data
 *                   properties:
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     nick_name:
 *                       type: string
 *                     gender:
 *                       type: string
 *                       enum: [Male, Female, Other]
 */
router.put('/profile', verifyAccessToken, UsersController.updateProfile)

/**
 * @swagger
 * /api/users/contact:
 *   put:
 *     summary: Update user contact information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to update
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               mobile_phone:
 *                 type: string
 *                 description: The mobile phone number of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Updated user contact data
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     mobile_phone:
 *                       type: string
 */
router.put('/contact', verifyAccessToken, UsersController.updateContact)

/**
 * @swagger
 * /api/users/avatar:
 *   put:
 *     summary: Update the user's avatar
 *     description: Updates the user's avatar URL based on the user ID.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - avatar_id
 *               - avatar_url
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: user-id
 *               avatar_id:
 *                 type: integer
 *                 description: The ID of the avatar
 *                 example: 123
 *               avatar_url:
 *                 type: string
 *                 description: The URL of the new avatar image
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Updated user profile information
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       example: user-id
 *                     avatar_url:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                 message:
 *                   type: string
 *                   example: "User avatar updated successfully"
 */

router.put('/avatar', verifyAccessToken, UsersController.updateUserAvatar)

/**
 * @swagger
 * /api/users/suspended:
 *   put:
 *     summary: Suspend a user
 *     description: Suspends a user based on the user ID.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to suspend
 *                 example: "user-id"
 *     responses:
 *       200:
 *         description: User suspended successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User suspended successfully"
 */
router.put('/suspended', verifyAccessToken, UsersController.suspendedUser)

/**
 * @swagger
 * /api/users/active:
 *   put:
 *     summary: Activate a user
 *     description: Activate a user based on the user ID.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to activate
 *                 example: "user-id"
 *     responses:
 *       200:
 *         description: User activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User activated successfully"
 */
router.put('/active', verifyAccessToken, UsersController.activeUser)

/**
 * @swagger
 * /api/users/role:
 *   put:
 *     summary: Change the role of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "a12b3456-78c9-012d-345e-678f9012gh34"
 *               role_id:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - user_id
 *               - role_id
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User or Role not found
 */
router.put('/role', verifyAccessToken, UsersController.changeUserRole)

/**
 * @swagger
 * /api/users/permission:
 *   put:
 *     summary: Change the permissions of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "a12b3456-78c9-012d-345e-678f9012gh34"
 *               permission_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *             required:
 *               - user_id
 *               - permission_ids
 *     responses:
 *       200:
 *         description: User permissions updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User or Permission not found
 */
router.put('/permission', verifyAccessToken, UsersController.changeUserPermission)

module.exports = router
