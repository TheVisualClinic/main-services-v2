const express = require('express')
const PageServiceContentController = require('../controllers/page-service-content.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-service-content/{service_id}:
 *   get:
 *     summary: Retrieve service contents
 *     description: Fetch the contents of a service including text and image details, ordered by their sequence.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to retrieve contents for
 *     responses:
 *       200:
 *         description: service contents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   service_content_id:
 *                     type: integer
 *                     description: Content ID
 *                   content_type:
 *                     type: string
 *                     description: Type of the content (TEXT or IMAGE)
 *                     example: "TEXT"
 *                   order:
 *                     type: integer
 *                     description: Display order of the content
 *                   text_th:
 *                     type: string
 *                     nullable: true
 *                     description: Text content in Thai
 *                   text_en:
 *                     type: string
 *                     nullable: true
 *                     description: Text content in English
 *                   image_id:
 *                     type: integer
 *                     nullable: true
 *                     description: ID of the associated image
 *                   image_url:
 *                     type: string
 *                     nullable: true
 *                     description: URL of the associated image
 *                   alt_text_th:
 *                     type: string
 *                     nullable: true
 *                     description: Alternative text for the image in Thai
 *                   alt_text_en:
 *                     type: string
 *                     nullable: true
 *                     description: Alternative text for the image in English
 *       404:
 *         description: service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "service not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An unexpected error occurred"
 */
router.get('/:service_id', verifyAccessToken, PageServiceContentController.getServiceContent)

/**
 * @swagger
 * /api/v1/page-service-content:
 *   post:
 *     summary: Create new service content
 *     description: This endpoint allows you to create a new content entry for a service, specifying the service ID, type of content (TEXT or IMAGE), its order, and additional type details.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_id
 *               - content_type
 *               - order
 *               - type
 *             properties:
 *               service_id:
 *                 type: integer
 *                 description: The ID of the service to which the content will be added
 *                 example: 1
 *               content_type:
 *                 type: string
 *                 enum: [TEXT, IMAGE]
 *                 description: The type of the content
 *                 example: "TEXT"
 *               order:
 *                 type: integer
 *                 description: The display order of the content
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: Additional type details (e.g., paragraph, thumbnail)
 *                 example: "paragraph"
 *     responses:
 *       201:
 *         description: service content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service_content_id:
 *                   type: integer
 *                   description: The ID of the newly created service content
 *                   example: 101
 *                 content_type:
 *                   type: string
 *                   description: The type of the content
 *                   example: "TEXT"
 *                 order:
 *                   type: integer
 *                   description: The display order of the content
 *                   example: 1
 *       400:
 *         description: Bad Request (invalid or missing data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid content_type or missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An unexpected error occurred"
 */
router.post('/', verifyAccessToken, PageServiceContentController.createServiceContent)

/**
 * @swagger
 * /api/v1/page-service-content/{service_content_id}:
 *   delete:
 *     summary: Delete a service content entry
 *     description: This endpoint allows users to delete a specific service content entry by content ID and service ID.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_content_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service content to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_id
 *             properties:
 *               service_id:
 *                 type: integer
 *                 description: The ID of the service associated with the content
 *                 example: 1
 *     responses:
 *       200:
 *         description: service content deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "service content deleted successfully"
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "service ID is required"
 *       404:
 *         description: service content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "service content not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.delete(
  '/:service_content_id',
  verifyAccessToken,
  PageServiceContentController.deleteServiceContent
)

/**
 * @swagger
 * /api/v1/page-service-content/order-content:
 *   put:
 *     summary: Update the order of a service content item
 *     description: Update the order of a specific service content item by providing its service content ID, service ID, and new order value.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_content_id
 *               - service_id
 *               - new_order
 *             properties:
 *               service_content_id:
 *                 type: integer
 *                 description: The ID of the service content item to update
 *                 example: 123
 *               service_id:
 *                 type: integer
 *                 description: The ID of the service to which the content belongs
 *                 example: 1
 *               new_order:
 *                 type: integer
 *                 description: The new order value for the service content item
 *                 example: 3
 *     responses:
 *       200:
 *         description: service content order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: service content updated successfully
 *                 data:
 *                   type: object
 *                   description: The updated service content item
 *                   properties:
 *                     service_content_id:
 *                       type: integer
 *                       description: The ID of the service content item
 *                     service_id:
 *                       type: integer
 *                       description: The ID of the service
 *                     new_order:
 *                       type: integer
 *                       description: The updated order value
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "service content ID, service ID, and new order are required"
 *       404:
 *         description: service content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "service content not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put('/update/order', verifyAccessToken, PageServiceContentController.updateOrderContent)

/**
 * @swagger
 * /api/v1/page-service-content/update/text:
 *   put:
 *     summary: Update text content
 *     description: Update the Thai and English text of a specific text content item.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_content_id
 *               - content_id
 *             properties:
 *               service_content_id:
 *                 type: integer
 *                 description: The ID of the service content that this text belongs to
 *                 example: 101
 *               content_id:
 *                 type: integer
 *                 description: The ID of the specific text content item
 *                 example: 201
 *               text_th:
 *                 type: string
 *                 description: The updated Thai text
 *                 example: "ข้อความใหม่ภาษาไทย"
 *               text_en:
 *                 type: string
 *                 description: The updated English text
 *                 example: "Updated English Text"
 *     responses:
 *       200:
 *         description: Text content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Text content updated successfully"
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid service_content_id or content_id"
 *       404:
 *         description: Text content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "TextContent not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put('/update/text', verifyAccessToken, PageServiceContentController.updateTextContent)

/**
 * @swagger
 * /api/v1/page-service-content/update/image:
 *   put:
 *     summary: Update image content
 *     description: Update the details of a specific image content item, including its image ID, URL, and alternative text.
 *     tags: [Page Services - Services Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_content_id
 *               - content_id
 *             properties:
 *               service_content_id:
 *                 type: integer
 *                 description: The ID of the service content associated with this image
 *                 example: 101
 *               content_id:
 *                 type: integer
 *                 description: The ID of the specific image content to update
 *                 example: 201
 *               image_id:
 *                 type: integer
 *                 description: The updated ID of the image
 *                 example: 301
 *               image_url:
 *                 type: string
 *                 format: url
 *                 description: The updated URL of the image
 *                 example: "https://example.com/new-image.jpg"
 *               alt_text_th:
 *                 type: string
 *                 description: The updated alternative text in Thai for the image
 *                 example: "คำอธิบายภาพภาษาไทย"
 *               alt_text_en:
 *                 type: string
 *                 description: The updated alternative text in English for the image
 *                 example: "Image description in English"
 *     responses:
 *       200:
 *         description: Image content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image content updated successfully"
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid service_content_id or content_id"
 *       404:
 *         description: Image content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ImageContent not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put('/update/image', verifyAccessToken, PageServiceContentController.updateImageContent)

module.exports = router
