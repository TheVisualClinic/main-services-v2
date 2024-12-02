const express = require('express')
const PageServiceListController = require('../controllers/page-service-list.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-service-list:
 *   get:
 *     summary: Retrieve a paginated list of services
 *     description: This endpoint allows users to retrieve a paginated list of services, with optional search and category filtering functionality.
 *     tags: [Page Services - Services List]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "cleaning"
 *         description: Search keyword for filtering services by name or description
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Category ID to filter services by category
 *     responses:
 *       200:
 *         description: A paginated list of services successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       service_name_th:
 *                         type: string
 *                         example: "บริการทำความสะอาด"
 *                       service_name_en:
 *                         type: string
 *                         example: "Cleaning Service"
 *                       cover_description_th:
 *                         type: string
 *                         example: "บริการคุณภาพสูงสำหรับบ้านและที่ทำงาน"
 *                       cover_description_en:
 *                         type: string
 *                         example: "High-quality service for home and office"
 *                       category_id:
 *                         type: integer
 *                         example: 2
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-13T12:34:56Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-14T14:20:30Z"
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, PageServiceListController.getServiceList)

/**
 * @swagger
 * /api/v1/page-service-list/draft:
 *   post:
 *     summary: Create a new draft service
 *     description: This endpoint allows authenticated users to create a new draft service.
 *     tags: [Page Services - Services List]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Draft service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service_id:
 *                   type: integer
 *                   example: 15
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.post('/draft', verifyAccessToken, PageServiceListController.createDraftService)

/**
 * @swagger
 * /api/v1/page-service-list/{service_id}:
 *   delete:
 *     summary: Delete a service
 *     description: This endpoint allows users to delete a specific service by ID.
 *     tags: [Page Services - Services List]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service deleted successfully"
 *       400:
 *         description: Service ID is required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:service_id', verifyAccessToken, PageServiceListController.deleteServiceById)

module.exports = router
