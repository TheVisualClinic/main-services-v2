const express = require('express')
const BaseSocialSectionController = require('../controllers/base-social-section.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/base-section-social:
 *   get:
 *     summary: Get the Base Social Section
 *     description: Retrieve the details of the first Base Social Section in the table.
 *     tags: [Base Section - Social]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the social section
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Base Social Section retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/BaseSocialSection'
 *       404:
 *         description: No Base Social Section found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, BaseSocialSectionController.getSectionDetail)

/**
 * @swagger
 * /api/v1/base-section-social/{id}:
 *   put:
 *     summary: Update details of Base Social Section by ID
 *     description: Update specific fields of the Base Social Section using its ID.
 *     tags: [Base Section - Social]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Base Social Section
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               background_id:
 *                 type: integer
 *                 description: ID of the background image
 *                 example: 101
 *               background_url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the background image
 *                 example: "https://example.com/background.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the social section
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Base Social Section updated successfully."
 *       404:
 *         description: Base Social Section not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, BaseSocialSectionController.updateSectionDetail)

module.exports = router
