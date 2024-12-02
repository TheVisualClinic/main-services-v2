const express = require('express')
const OtpHistoryController = require('../controllers/otpHistory.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: OTP Services
 *   description: API for managing OTP history and operations
 */

/**
 * @swagger
 * /api/otp:
 *   get:
 *     summary: Get list of OTP history
 *     tags: [OTP Services]
 *     security:
 *       - bearerAuth: []  # Assuming JWT bearer token authentication
 *     responses:
 *       200:
 *         description: List of OTP history records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OTPHistory'
 *       401:
 *         description: Unauthorized access, invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, OtpHistoryController.getOtpHistoryList)

/**
 * @swagger
 * /api/otp/forgot-password:
 *   post:
 *     summary: Send an OTP
 *     tags: [OTP Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - action_type
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to send the OTP to
 *                 example: example@example.com
 *               action_type:
 *                 type: string
 *                 description: The action triggering the OTP (e.g., PASSWORD_RESET, EMAIL_VERIFICATION)
 *                 example: "PASSWORD_RESET"
 *     responses:
 *       201:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OTPHistory'
 *       400:
 *         description: Invalid request, missing required fields
 *       422:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', OtpHistoryController.sendForgotPasswordOtp)

/**
 * @swagger
 * /api/otp/validate:
 *   post:
 *     summary: Validate an OTP
 *     tags: [OTP Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp_code
 *               - otp_ref
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address associated with the OTP
 *                 example: example@example.com
 *               otp_code:
 *                 type: string
 *                 description: The 6-digit OTP code
 *                 example: "123456"
 *               otp_ref:
 *                 type: string
 *                 description: A 4-character alphanumeric reference for the OTP
 *                 example: "A1B2"
 *     responses:
 *       200:
 *         description: OTP validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP validated successfully"
 *       400:
 *         description: Invalid request, missing required fields
 *       422:
 *         description: Invalid OTP or OTP reference
 *       500:
 *         description: Internal server error
 */
router.post('/validate', OtpHistoryController.validateOtp)

module.exports = router
