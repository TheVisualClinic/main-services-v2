const express = require('express')
const BlogListController = require('../controllers/blog-list.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/blog-list:
 *   get:
 *     summary: Retrieve a paginated list of blogs, with optional year and search filter
 *     description: This endpoint allows users to retrieve a paginated list of blog posts, and optionally filter by year or search keyword.
 *     tags: [Blog List Services]
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
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: Year to filter blog posts
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "example keyword"
 *         description: Search keyword for filtering blog posts by title or description
 *     responses:
 *       200:
 *         description: A paginated list of blogs successfully retrieved
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
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title_th:
 *                         type: string
 *                         example: "บทความแรก"
 *                       title_en:
 *                         type: string
 *                         example: "First Blog Post"
 *                       description_th:
 *                         type: string
 *                         example: "คำอธิบายภาษาไทย"
 *                       description_en:
 *                         type: string
 *                         example: "Description in English"
 *                       username:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: "John"
 *                           last_name:
 *                             type: string
 *                             example: "Doe"
 *                       create_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-13T12:34:56Z"
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, BlogListController.getBlogList)

/**
 * @swagger
 * /api/v1/blog-list/draft:
 *   post:
 *     summary: Create a new draft blog
 *     description: This endpoint allows authenticated users to create a new draft blog.
 *     tags: [Blog List Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Draft blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog_id:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.post('/draft', verifyAccessToken, BlogListController.createDraftBlog)

/**
 * @swagger
 * /api/blog-list/{blog_id}:
 *   delete:
 *     summary: Delete a blog post
 *     description: This endpoint allows users to delete a specific blog post by ID.
 *     tags: [Blog List Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog deleted successfully"
 *       400:
 *         description: Blog ID is required
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:blog_id', verifyAccessToken, BlogListController.deleteBlogById)

/**
 * @swagger
 * /api/v1/blog-list/filter/years:
 *   get:
 *     summary: Retrieve a list of blog years
 *     description: This endpoint allows users to retrieve distinct years in which blogs were created.
 *     tags: [Blog List Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of years successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   year:
 *                     type: integer
 *                     example: 2024
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.get('/filter/years', verifyAccessToken, BlogListController.getFilterYearsList)

/**
 * @swagger
 * /api/v1/blog-list/duplicate/{blog_id}:
 *   post:
 *     summary: Duplicate a blog post
 *     description: This endpoint allows users to duplicate a specific blog post by ID.
 *     tags: [Blog List Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to duplicate
 *     responses:
 *       201:
 *         description: Blog duplicated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog duplicated successfully"
 *                 newBlog:
 *                   type: object
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.post('/duplicate/:blog_id', verifyAccessToken, BlogListController.duplicateBlog)

module.exports = router
