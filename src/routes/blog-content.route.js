const express = require('express')
const BlogContentController = require('../controllers/blog-content.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/blog-content/{blog_id}:
 *   get:
 *     summary: Retrieve blog contents
 *     description: Fetch the contents of a blog including text and image details, ordered by their sequence.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to retrieve contents for
 *     responses:
 *       200:
 *         description: Blog contents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_content_id:
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
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Blog not found"
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
router.get('/:blog_id', verifyAccessToken, BlogContentController.getBlogContent)

/**
 * @swagger
 * /api/v1/blog-content:
 *   post:
 *     summary: Create new blog content
 *     description: This endpoint allows you to create a new content entry for a blog, specifying the blog ID, type of content (TEXT or IMAGE), its order, and additional type details.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_id
 *               - content_type
 *               - order
 *               - type
 *             properties:
 *               blog_id:
 *                 type: integer
 *                 description: The ID of the blog to which the content will be added
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
 *         description: Blog content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog_content_id:
 *                   type: integer
 *                   description: The ID of the newly created blog content
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
router.post('/', verifyAccessToken, BlogContentController.createBlogContent)

/**
 * @swagger
 * /api/v1/blog-content/{blog_content_id}:
 *   delete:
 *     summary: Delete a blog content entry
 *     description: This endpoint allows users to delete a specific blog content entry by content ID and blog ID.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_content_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog content to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_id
 *             properties:
 *               blog_id:
 *                 type: integer
 *                 description: The ID of the blog associated with the content
 *                 example: 1
 *     responses:
 *       200:
 *         description: Blog content deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog content deleted successfully"
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog ID is required"
 *       404:
 *         description: Blog content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog content not found"
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
router.delete('/:blog_content_id', verifyAccessToken, BlogContentController.deleteBlogContent)

/**
 * @swagger
 * /api/v1/blog-content/order-content:
 *   put:
 *     summary: Update the order of a blog content item
 *     description: Update the order of a specific blog content item by providing its blog content ID, blog ID, and new order value.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_content_id
 *               - blog_id
 *               - new_order
 *             properties:
 *               blog_content_id:
 *                 type: integer
 *                 description: The ID of the blog content item to update
 *                 example: 123
 *               blog_id:
 *                 type: integer
 *                 description: The ID of the blog to which the content belongs
 *                 example: 1
 *               new_order:
 *                 type: integer
 *                 description: The new order value for the blog content item
 *                 example: 3
 *     responses:
 *       200:
 *         description: Blog content order updated successfully
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
 *                   example: Blog content updated successfully
 *                 data:
 *                   type: object
 *                   description: The updated blog content item
 *                   properties:
 *                     blog_content_id:
 *                       type: integer
 *                       description: The ID of the blog content item
 *                     blog_id:
 *                       type: integer
 *                       description: The ID of the blog
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
 *                   example: "Blog content ID, blog ID, and new order are required"
 *       404:
 *         description: Blog content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog content not found"
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
router.put('/update/order', verifyAccessToken, BlogContentController.updateOrderContent)

/**
 * @swagger
 * /api/v1/blog-content/update/text:
 *   put:
 *     summary: Update text content
 *     description: Update the Thai and English text of a specific text content item.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_content_id
 *               - content_id
 *             properties:
 *               blog_content_id:
 *                 type: integer
 *                 description: The ID of the blog content that this text belongs to
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
 *                   example: "Invalid blog_content_id or content_id"
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
router.put('/update/text', verifyAccessToken, BlogContentController.updateTextContent)

/**
 * @swagger
 * /api/v1/blog-content/update/image:
 *   put:
 *     summary: Update image content
 *     description: Update the details of a specific image content item, including its image ID, URL, and alternative text.
 *     tags: [Blog Content Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_content_id
 *               - content_id
 *             properties:
 *               blog_content_id:
 *                 type: integer
 *                 description: The ID of the blog content associated with this image
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
 *                   example: "Invalid blog_content_id or content_id"
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
router.put('/update/image', verifyAccessToken, BlogContentController.updateImageContent)

module.exports = router
