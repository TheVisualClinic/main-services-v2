const express = require('express')
const BlogDetailController = require('../controllers/blog-detail.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}:
 *   get:
 *     summary: Get blog details by ID
 *     description: Retrieve detailed information about a blog, including its contents, tags, and author details.
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Blog ID
 *                 slug:
 *                   type: string
 *                   description: Unique identifier for the blog
 *                 title_th:
 *                   type: string
 *                   description: Blog title in Thai
 *                 title_en:
 *                   type: string
 *                   description: Blog title in English
 *                 header_image_url:
 *                   type: string
 *                   format: url
 *                   description: URL of the header image
 *                 cover_image_url:
 *                   type: string
 *                   format: url
 *                   description: URL of the cover image
 *                 created_by:
 *                   type: object
 *                   nullable: true
 *                   description: Details of the user who created the blog
 *                   properties:
 *                     full_name:
 *                       type: string
 *                       description: Full name of the creator
 *                     nick_name:
 *                       type: string
 *                       description: Nickname of the creator
 *                 tag_list:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: List of tag IDs associated with the blog
 *                 author:
 *                   type: object
 *                   description: Details of the blog author
 *                   properties:
 *                     full_name:
 *                       type: string
 *                       description: Full name of the author
 *                     nick_name:
 *                       type: string
 *                       description: Nickname of the author
 *                     description:
 *                       type: string
 *                       description: Description of the author
 *                     author_url:
 *                       type: string
 *                       format: url
 *                       description: URL to the author's profile or website
 *                 status:
 *                   type: string
 *                   description: Status of the blog (e.g., published, draft)
 *                 public_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the blog
 *                 time_to_read:
 *                   type: integer
 *                   description: Estimated reading time in minutes
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get('/:blog_id', verifyAccessToken, BlogDetailController.getBlogDetail)

/**
 * @swagger
 * /api/v1/blog-detail/update/{blog_id}/status:
 *   put:
 *     summary: Update the status of a blog post
 *     description: This endpoint allows users to update the status of a blog post (e.g., draft, public, unpublic).
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, public, unpublic]
 *                 example: "public"
 *     responses:
 *       200:
 *         description: Blog status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog status updated successfully"
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:blog_id/status', verifyAccessToken, BlogDetailController.updateBlogStatus)

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}/header-image:
 *   put:
 *     summary: Update the header image of a blog
 *     description: This endpoint allows users to update the header image of an existing blog.
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               header_image_id:
 *                 type: integer
 *                 description: The ID of the new header image
 *                 example: 123
 *               header_image_url:
 *                 type: string
 *                 format: url
 *                 description: The URL of the new header image
 *                 example: "https://example.com/new-header-image.jpg"
 *     responses:
 *       200:
 *         description: Blog header image successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Blog header image updated successfully."
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/:blog_id/header-image', verifyAccessToken, BlogDetailController.updateHeaderImage)

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}/cover-image:
 *   put:
 *     summary: Update the cover image of a blog
 *     description: This endpoint allows users to update the cover image of an existing blog.
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cover_image_id:
 *                 type: integer
 *                 description: The ID of the new cover image
 *                 example: 456
 *               cover_image_url:
 *                 type: string
 *                 format: url
 *                 description: The URL of the new cover image
 *                 example: "https://example.com/new-cover-image.jpg"
 *     responses:
 *       200:
 *         description: Blog cover image successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Blog cover image updated successfully."
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/:blog_id/cover-image', verifyAccessToken, BlogDetailController.updateCoverImage)

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}/slug:
 *   put:
 *     summary: Update the slug for a specific blog
 *     description: Update the slug of a blog with a unique value. If the slug already exists in the database, an error will be returned.
 *     tags: [Blog Services]
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_slug:
 *                 type: string
 *                 description: The new unique slug for the blog
 *                 example: "draft-20241113103111"
 *     responses:
 *       200:
 *         description: Slug updated successfully
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
 *                   example: Slug updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     blog_id:
 *                       type: integer
 *                       example: 1
 *                     slug:
 *                       type: string
 *                       example: "draft-20241113103111"
 *       400:
 *         description: Slug is required
 *       409:
 *         description: Slug already exists
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:blog_id/slug', verifyAccessToken, BlogDetailController.updateSlug)

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}/setting:
 *   put:
 *     summary: Update blog category and tags
 *     tags: [Blog Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_names:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Technology", "Health"]
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tags and category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tags and category updated successfully
 *                 tag_lists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       name:
 *                         type: string
 *                         example: "Health"
 *                 category:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid blog ID or request body"
 *       404:
 *         description: Blog or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Blog with ID '1' not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put('/:blog_id/setting', verifyAccessToken, BlogDetailController.updateSetting)

/**
 * @swagger
 * /api/v1/blog-detail/{blog_id}/title:
 *   put:
 *     summary: Update the title and other details of a blog
 *     description: This endpoint allows users to update the title, descriptions, reading time, and author details of a blog.
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title_th:
 *                 type: string
 *                 description: Blog title in Thai
 *                 example: "หัวข้อบล็อกภาษาไทย"
 *               title_en:
 *                 type: string
 *                 description: Blog title in English
 *                 example: "Blog Title in English"
 *               description_th:
 *                 type: string
 *                 description: Blog description in Thai
 *                 example: "รายละเอียดบล็อกภาษาไทย"
 *               description_en:
 *                 type: string
 *                 description: Blog description in English
 *                 example: "Blog description in English"
 *               time_to_read:
 *                 type: integer
 *                 description: Estimated reading time in minutes
 *                 example: 5
 *               author_fullname:
 *                 type: string
 *                 description: Full name of the author
 *                 example: "John Doe"
 *               author_nickname:
 *                 type: string
 *                 description: Nickname of the author
 *                 example: "JD"
 *               author_description:
 *                 type: string
 *                 description: A brief description about the author
 *                 example: "An experienced tech blogger"
 *               author_url:
 *                 type: string
 *                 format: url
 *                 description: URL to the author's profile or website
 *                 example: "https://example.com/author-profile"
 *     responses:
 *       200:
 *         description: Blog details successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Blog title updated successfully"
 *                 blog_id:
 *                   type: integer
 *                   description: The ID of the updated blog
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
router.put('/:blog_id/title', verifyAccessToken, BlogDetailController.updateTitle)

/**
 * @swagger
 * /api/v1/blog-detail/preview/{slug}:
 *   get:
 *     summary: Get a blog preview by slug
 *     description: Retrieve a blog preview including its contents, author details, and metadata based on the slug.
 *     tags: [Blog Detail Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog preview successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Blog preview retrieved successfully"
 *                 data:
 *                   type: object
 *                   description: Blog preview data
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Blog ID
 *                     title_th:
 *                       type: string
 *                       description: Blog title in Thai
 *                     title_en:
 *                       type: string
 *                       description: Blog title in English
 *                     header_image_url:
 *                       type: string
 *                       format: url
 *                       description: URL of the header image
 *                     created_by:
 *                       type: object
 *                       nullable: true
 *                       description: Details of the user who created the blog
 *                       properties:
 *                         full_name:
 *                           type: string
 *                           description: Full name of the creator
 *                         nick_name:
 *                           type: string
 *                           description: Nickname of the creator
 *                     contents:
 *                       type: array
 *                       description: Array of blog contents
 *                       items:
 *                         type: object
 *                         properties:
 *                           blog_content_id:
 *                             type: integer
 *                             description: Content ID
 *                           content_type:
 *                             type: string
 *                             description: Type of the content (TEXT or IMAGE)
 *                             example: "TEXT"
 *                           order:
 *                             type: integer
 *                             description: Display order of the content
 *                           text_th:
 *                             type: string
 *                             nullable: true
 *                             description: Text content in Thai
 *                           text_en:
 *                             type: string
 *                             nullable: true
 *                             description: Text content in English
 *                           image_url:
 *                             type: string
 *                             nullable: true
 *                             description: Image URL for image content
 *                           alt_text_th:
 *                             type: string
 *                             nullable: true
 *                             description: Alternative text in Thai for the image
 *                           alt_text_en:
 *                             type: string
 *                             nullable: true
 *                             description: Alternative text in English for the image
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
 *                   example: "Blog with slug \"example-slug\" not found"
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
router.get('/preview/:slug', verifyAccessToken, BlogDetailController.getBlogPreview)

module.exports = router
