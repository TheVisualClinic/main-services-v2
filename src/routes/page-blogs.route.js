const express = require('express')
const PageBlogsController = require('../controllers/page-blogs.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-blogs:
 *   get:
 *     summary: Get the Page Blogs details
 *     description: Retrieve the details of the Page Blogs section.
 *     tags: [Page Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the Page Blogs details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Status of the request
 *                 message:
 *                   type: string
 *                   example: "Page Blogs details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageBlogs'
 *       404:
 *         description: Page Blogs not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, PageBlogsController.getDetail)

/**
 * @swagger
 * /api/v1/page-blogs/{id}:
 *   put:
 *     summary: Update the Page Blogs details by ID
 *     description: Update specific fields of the Page Blogs section using its ID.
 *     tags: [Page Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Blogs section
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               header_image_id:
 *                 type: integer
 *                 description: ID of the header image
 *                 example: 101
 *               header_image_url:
 *                 type: string
 *                 description: URL of the header image
 *                 example: "https://example.com/header-image.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the Page Blogs details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Status of the request
 *                 message:
 *                   type: string
 *                   example: "Page Blogs updated successfully."
 *       404:
 *         description: Page Blogs not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, PageBlogsController.updateDetail)

module.exports = router
