const express = require('express')
const PageServiceDetailController = require('../controllers/page-service-detail.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}:
 *   get:
 *     summary: Get service details by ID
 *     description: Retrieve detailed information about a service, including its contents and metadata.
 *     tags: [Page Services - Services Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Service successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Service ID
 *                 slug_th:
 *                   type: string
 *                   description: Thai slug
 *                 slug_en:
 *                   type: string
 *                   description: English slug
 *                 service_name_th:
 *                   type: string
 *                   description: Service name in Thai
 *                 service_name_en:
 *                   type: string
 *                   description: Service name in English
 *                 header_image_url:
 *                   type: string
 *                   format: url
 *                   description: URL of the header image
 *                 cover_image_url:
 *                   type: string
 *                   format: url
 *                   description: URL of the cover image
 *                 status:
 *                   type: string
 *                   description: Status of the service
 *                 public_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the service
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.get('/:service_id', verifyAccessToken, PageServiceDetailController.getServiceDetail)

/**
 * @swagger
 * /api/v1/page-service-detail/update/{service_id}/status:
 *   put:
 *     summary: Update the status of a service
 *     description: Update the status of a service (e.g., draft, public, unpublic).
 *     tags: [Page Services - Services Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to update
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
 *         description: Service status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service status updated successfully"
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/update/:service_id/status',
  verifyAccessToken,
  PageServiceDetailController.updateServiceStatus
)

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}/header-image:
 *   put:
 *     summary: Update the header image of a service
 *     description: Update the header image of a service.
 *     tags: [Page Services - Services Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               header_image_id:
 *                 type: integer
 *                 description: ID of the new header image
 *               header_image_url:
 *                 type: string
 *                 format: url
 *                 description: URL of the new header image
 *     responses:
 *       200:
 *         description: Header image updated successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:service_id/header-image',
  verifyAccessToken,
  PageServiceDetailController.updateHeaderImage
)

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}/cover-image:
 *   put:
 *     summary: Update the cover image of a service
 *     description: Update the cover image of a service.
 *     tags: [Page Services - Services Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cover_image_id:
 *                 type: integer
 *                 description: ID of the new cover image
 *               cover_image_url:
 *                 type: string
 *                 format: url
 *                 description: URL of the new cover image
 *     responses:
 *       200:
 *         description: Cover image updated successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:service_id/cover-image',
  verifyAccessToken,
  PageServiceDetailController.updateCoverImage
)

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}/slug:
 *   put:
 *     summary: Update the slug for a service
 *     description: Update the slug of a service with a unique value.
 *     tags: [Page Services - Services Detail]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_slug_th:
 *                 type: string
 *                 description: New slug in Thai
 *               new_slug_en:
 *                 type: string
 *                 description: New slug in English
 *     responses:
 *       200:
 *         description: Slug updated successfully
 *       400:
 *         description: Slug is required
 *       409:
 *         description: Slug already exists
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put('/:service_id/slug', verifyAccessToken, PageServiceDetailController.updateSlug)

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}/setting:
 *   put:
 *     summary: Update blog category and tags
 *     tags: [Page Services - Services Detail]
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
router.put('/:service_id/setting', verifyAccessToken, PageServiceDetailController.updateSetting)

/**
 * @swagger
 * /api/v1/page-service-detail/{service_id}/title:
 *   put:
 *     summary: Update the title and other details of a blog
 *     description: This endpoint allows users to update the title, descriptions, reading time, and author details of a blog.
 *     tags: [Page Services - Services Detail]
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
router.put('/:service_id/title', verifyAccessToken, PageServiceDetailController.updateTitle)

/**
 * @swagger
 * /api/v1/page-service-detail/preview/{slug}:
 *   get:
 *     summary: Get a blog preview by slug
 *     description: Retrieve a blog preview including its contents, author details, and metadata based on the slug.
 *     tags: [Page Services - Services Detail]
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
router.get('/preview/:slug', verifyAccessToken, PageServiceDetailController.getServicePreview)

module.exports = router
