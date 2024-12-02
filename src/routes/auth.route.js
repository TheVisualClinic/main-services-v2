const express = require('express')
const AuthController = require('../controllers/auth.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - remember_me
 *             properties:
 *               username:
 *                 type: string
 *                 example: "captain"
 *               password:
 *                 type: string
 *                 example: "P@ssword"
 *               remember_me:
 *                 type: boolen
 *                 example: false
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request due to missing or invalid input
 *       404:
 *         description: Incorrect username or password
 */
router.post('/login', AuthController.login)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user using invite key
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteKey
 *               - username
 *               - password
 *               - email
 *               - mobile_phone
 *               - first_name
 *               - last_name
 *               - nick_name
 *               - gender
 *               - role_id
 *             properties:
 *               inviteKey:
 *                 type: string
 *                 example: "ABCD1234"
 *               username:
 *                 type: string
 *                 example: "user1@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssword"
 *               email:
 *                 type: string
 *                 example: "user1@example.com"
 *               mobile_phone:
 *                 type: string
 *                 example: "0897283736"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               nick_name:
 *                 type: string
 *                 example: "Johnny"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               role_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Username already taken or invite key invalid
 */
router.post('/register', AuthController.register)

/**
 * @swagger
 * /api/auth/tokens/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "token"
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "token"
 *       400:
 *         description: Bad request due to missing or invalid input
 *       401:
 *         description: Invalid refresh token
 */
router.post('/tokens/refresh', AuthController.refreshToken)

/**
 * @swagger
 * /api/auth/tokens/revoke:
 *   post:
 *     summary: Revoke refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token revoked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token revoked successfully"
 *       400:
 *         description: Bad request due to missing or invalid input
 *       401:
 *         description: Invalid refresh token
 */
router.post('/tokens/revoke', verifyAccessToken, AuthController.revokeToken)

/**
 * @swagger
 * /api/auth/tokens/verify:
 *   post:
 *     summary: Verify access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Access token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access token is valid"
 *                 userId:
 *                   type: string
 *                   example: "1"
 *                 username:
 *                   type: string
 *                   example: "user1"
 *       400:
 *         description: Bad request due to missing or invalid input
 *       401:
 *         description: Invalid access token
 */
router.post('/tokens/verify', AuthController.verifyAccessToken)

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - new_password
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user-id"
 *               new_password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Bad request due to missing or invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/reset-password', verifyAccessToken, AuthController.resetPassword)

/**
 * @swagger
 * /api/auth/forgot/reset-password:
 *   put:
 *     summary: Reset user password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp_id
 *               - new_password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp_id:
 *                 type: integer
 *                 example: 1
 *               new_password:
 *                 type: string
 *                 example: "newStrongPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Missing required fields or invalid input
 *       404:
 *         description: User not found or invalid OTP
 *       500:
 *         description: Internal server error
 */
router.put('/forgot/reset-password', AuthController.forgotResetPassword)

module.exports = router
