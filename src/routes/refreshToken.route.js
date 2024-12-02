const express = require('express')
const RefreshTokenController = require('../controllers/refreshToken.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/refresh-tokens:
 *   get:
 *     summary: Get all refresh tokens
 *     tags: [RefreshToken]
 *     responses:
 *       200:
 *         description: Refresh tokens retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefreshToken'
 */
router.get('/', verifyAccessToken, RefreshTokenController.getAll)

/**
 * @swagger
 * /api/refresh-tokens/search:
 *   get:
 *     summary: Search refresh tokens
 *     tags: [RefreshToken]
 *     parameters:
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: string
 *       - name: ip_address
 *         in: query
 *         schema:
 *           type: string
 *       - name: user_agent
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefreshToken'
 */
router.get('/search', verifyAccessToken, RefreshTokenController.search)

/**
 * @swagger
 * /api/refresh-tokens/search/date-scope:
 *   get:
 *     summary: Get refresh tokens by date range
 *     tags: [RefreshToken]
 *     parameters:
 *       - name: start_date
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: '2024-08-01'
 *         description: The start date for the date range
 *       - name: end_date
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: '2024-08-10'
 *         description: The end date for the date range
 *     responses:
 *       200:
 *         description: Tokens retrieved by date range successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefreshToken'
 */
router.get('/search/date-scope', verifyAccessToken, RefreshTokenController.getByCreatedAt)

module.exports = router
