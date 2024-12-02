const express = require('express')
const BasePartnerSectionController = require('../controllers/base-partner-section.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/base-section-partner:
 *   get:
 *     summary: Get the first Base Partner Section
 *     description: Retrieve the first Base Partner Section in the table.
 *     tags: [Base Section - Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the partner section
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
 *                   $ref: '#/components/schemas/BasePartnerSection'
 *       404:
 *         description: No Base Partner Section found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, BasePartnerSectionController.getSectionDetail)

/**
 * @swagger
 * /api/v1/base-section-partner/{id}:
 *   put:
 *     summary: Update details of Base Partner Section by ID
 *     description: Update specific fields of the Base Partner Section using its ID.
 *     tags: [Base Section - Partner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Base Partner Section
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title_th:
 *                 type: string
 *               title_en:
 *                 type: string
 *               image_sm_id:
 *                 type: integer
 *               image_sm_url:
 *                 type: string
 *               image_md_id:
 *                 type: integer
 *               image_md_url:
 *                 type: string
 *               image_lg_id:
 *                 type: integer
 *               image_lg_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the partner section
 *       404:
 *         description: Base Partner Section not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, BasePartnerSectionController.updateSectionDetail)

module.exports = router
