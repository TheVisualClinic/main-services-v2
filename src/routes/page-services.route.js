const express = require('express')
const PageServicesController = require('../controllers/page-services.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-services:
 *   get:
 *     summary: Get Page Services details
 *     description: Retrieve details for the Page Services section.
 *     tags: [Page Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Page Services details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the success of the request.
 *                 message:
 *                   type: string
 *                   example: "Page Services details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageServices'
 *       404:
 *         description: Page Services details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', verifyAccessToken, PageServicesController.getDetail)

/**
 * @swagger
 * /api/v1/page-services/{id}:
 *   put:
 *     summary: Update Page Services details by ID
 *     description: Update specific fields of the Page Services section using its ID.
 *     tags: [Page Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Services record.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caption_th:
 *                 type: string
 *                 description: Caption in Thai.
 *                 example: "บริการของเรา"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English.
 *                 example: "Our Services"
 *               title_th:
 *                 type: string
 *                 description: Title in Thai.
 *                 example: "รายละเอียดบริการในภาษาไทย"
 *               title_en:
 *                 type: string
 *                 description: Title in English.
 *                 example: "Details of our services in English."
 *     responses:
 *       200:
 *         description: Successfully updated Page Services details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the success of the request.
 *                 message:
 *                   type: string
 *                   example: "Page Services updated successfully."
 *       404:
 *         description: Page Services details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', verifyAccessToken, PageServicesController.updateDetail)

module.exports = router
