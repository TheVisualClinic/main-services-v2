const express = require('express')
const BaseCaptionSectionController = require('../controllers/base-caption-section.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/base-section-caption:
 *   get:
 *     summary: Get the first Base Caption Section
 *     description: Retrieve the first Base Caption Section in the table.
 *     tags: [Base Section - Caption]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the caption section
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/BaseCaptionSection'
 *       404:
 *         description: No Base Caption Section found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, BaseCaptionSectionController.getSectionDetail)

/**
 * @swagger
 * /api/v1/base-section-caption/{id}:
 *   put:
 *     summary: Update details of Base Caption Section by ID
 *     description: Update specific fields of the Base Caption Section using its ID.
 *     tags: [Base Section - Caption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Base Caption Section
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
 *               background_url:
 *                 type: string
 *               title_th:
 *                 type: string
 *               title_en:
 *                 type: string
 *               content_th:
 *                 type: string
 *               content_en:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the caption section
 *       404:
 *         description: Base Caption Section not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, BaseCaptionSectionController.updateSectionDetail)

module.exports = router
