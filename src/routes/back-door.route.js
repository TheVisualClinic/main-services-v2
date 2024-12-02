const express = require('express')
const BackDoorController = require('../controllers/back-door.controller')

const router = express.Router()

/**
 * @swagger
 * /api/back-door/blogs/check-order:
 *   get:
 *     summary: Retrieve blog order
 *     description: Fetches the current order of blogs in the system. Requires a PIN for access.
 *     tags: [Back Support]
 *     parameters:
 *       - in: query
 *         name: pin
 *         required: true
 *         schema:
 *           type: string
 *           description: Access PIN to retrieve the blog order.
 *     responses:
 *       200:
 *         description: Successfully retrieved blog order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the blog.
 *                     example: "12345"
 *                   title:
 *                     type: string
 *                     description: The title of the blog.
 *                     example: "How to use Swagger"
 *                   order:
 *                     type: integer
 *                     description: The display order of the blog.
 *                     example: 1
 *       400:
 *         description: Missing or invalid PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing PIN"
 *       500:
 *         description: Internal server error
 */
router.get('/blogs/check-order', BackDoorController.checkBlogOrder)

/**
 * @swagger
 * /api/back-door/services/check-order:
 *   get:
 *     summary: Retrieve service order
 *     description: Fetches the current order of services in the system. Requires a PIN for access.
 *     tags: [Back Support]
 *     parameters:
 *       - in: query
 *         name: pin
 *         required: true
 *         schema:
 *           type: string
 *           description: Access PIN to retrieve the service order.
 *     responses:
 *       200:
 *         description: Successfully retrieved service order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the service.
 *                     example: "67890"
 *                   name:
 *                     type: string
 *                     description: The name of the service.
 *                     example: "Premium Service"
 *                   order:
 *                     type: integer
 *                     description: The display order of the service.
 *                     example: 2
 *       400:
 *         description: Missing or invalid PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing PIN"
 *       500:
 *         description: Internal server error
 */
router.get('/services/check-order', BackDoorController.checkServicesOrder)

/**
 * @swagger
 * /api/back-door/blogs/adjust-duplicate-orders:
 *   get:
 *     summary: Adjust duplicate blog orders
 *     description: Adjusts the duplicate orders for blogs and reorders them sequentially. Requires a PIN for access.
 *     tags: [Back Support]
 *     parameters:
 *       - in: query
 *         name: pin
 *         required: true
 *         schema:
 *           type: string
 *           description: Access PIN to adjust duplicate blog orders.
 *     responses:
 *       200:
 *         description: Successfully adjusted duplicate blog orders
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Order has been successfully adjusted."
 *       400:
 *         description: Missing or invalid PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or unauthorized PIN"
 *       500:
 *         description: Internal server error
 */
router.get('/blogs/adjust-duplicate-orders', BackDoorController.adjustBlogsDuplicateOrders)

module.exports = router
