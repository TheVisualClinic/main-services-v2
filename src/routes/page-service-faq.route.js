const express = require('express')
const PageServiceFaqController = require('../controllers/page-service-faq.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-service-faq/{service_id}:
 *   get:
 *     summary: Get FAQs for a specific service
 *     description: Retrieve FAQs for the given service ID, ordered by their display order.
 *     tags: [Page Service - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to retrieve FAQs for
 *     responses:
 *       200:
 *         description: FAQs retrieved successfully
 *       400:
 *         description: Service ID is missing
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/:service_id', verifyAccessToken, PageServiceFaqController.getServiceFaq)

/**
 * @swagger
 * /api/v1/page-service-faq:
 *   post:
 *     summary: Create an empty FAQ for a service
 *     description: Create a new FAQ associated with a service ID, with all other fields set to null by default.
 *     tags: [Page Service - FAQs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: integer
 *                 description: The ID of the service to associate the FAQ with
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empty FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message about the result
 *                   example: "Empty FAQ created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The ID of the newly created FAQ
 *                       example: 'ok'
 *       400:
 *         description: Service ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Service ID is required"
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyAccessToken, PageServiceFaqController.createFaq)

/**
 * @swagger
 * /api/v1/page-service-faq/{id}:
 *   put:
 *     summary: Update an FAQ
 *     description: Update an existing FAQ with new information.
 *     tags: [Page Service - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the FAQ to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title_th:
 *                 type: string
 *                 description: FAQ title in Thai
 *                 example: "แก้ไขคำถาม"
 *               title_en:
 *                 type: string
 *                 description: FAQ title in English
 *                 example: "Updated Question"
 *               description_th:
 *                 type: string
 *                 description: FAQ description in Thai
 *                 example: "แก้ไขคำอธิบาย"
 *               description_en:
 *                 type: string
 *                 description: FAQ description in English
 *                 example: "Updated Description"
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyAccessToken, PageServiceFaqController.updateFaq)

/**
 * @swagger
 * /api/v1/page-service-faq/{id}:
 *   delete:
 *     summary: Delete an FAQ
 *     description: Delete a specific FAQ by its ID.
 *     tags: [Page Service - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the FAQ to delete
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyAccessToken, PageServiceFaqController.deleteFaq)

/**
 * @swagger
 * /api/v1/page-service-faq/{id}/reorder:
 *   patch:
 *     summary: Reorder an FAQ
 *     description: Change the order of an FAQ within a service.
 *     tags: [Page Service - FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the FAQ to reorder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newOrder:
 *                 type: integer
 *                 description: The new order for the FAQ
 *                 example: 3
 *     responses:
 *       200:
 *         description: FAQ reordered successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/reorder', verifyAccessToken, PageServiceFaqController.reorderFaq)

module.exports = router
