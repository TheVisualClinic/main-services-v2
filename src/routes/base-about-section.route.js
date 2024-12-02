const express = require('express')
const BaseAboutSectionController = require('../controllers/base-about-section.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/base-section-about:
 *   get:
 *     summary: Get the first Base About Section
 *     description: Retrieve the first Base About Section in the table.
 *     tags: [Base Section - About]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the section
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
 *                   $ref: '#/components/schemas/BaseAboutSection'
 *       404:
 *         description: No Base About Section found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, BaseAboutSectionController.getSectionDetail)

/**
 * @swagger
 * /api/v1/base-section-about/{id}:
 *   put:
 *     summary: Update details of Base About Section by ID
 *     description: Update specific fields of the Base About Section using its ID.
 *     tags: [Base Section - About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Base About Section
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
 *               caption_th:
 *                 type: string
 *               caption_en:
 *                 type: string
 *               title_th:
 *                 type: string
 *               title_en:
 *                 type: string
 *               icon_1_id:
 *                 type: integer
 *               icon_1_url:
 *                 type: string
 *               icon_1_caption_th:
 *                 type: string
 *               icon_2_id:
 *                 type: integer
 *               icon_2_url:
 *                 type: string
 *               icon_2_caption_th:
 *                 type: string
 *               icon_3_id:
 *                 type: integer
 *               icon_3_url:
 *                 type: string
 *               icon_3_caption_th:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the section
 *       404:
 *         description: Base About Section not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, BaseAboutSectionController.updateSectionDetail)

module.exports = router
