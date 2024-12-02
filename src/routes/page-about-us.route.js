const express = require('express')
const PageAboutUsController = require('../controllers/page-about-us.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-about-us:
 *   get:
 *     summary: Get Page About Us details
 *     description: Retrieve details for the Page About Us section.
 *     tags: [Page About Us]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Page About Us details.
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
 *                   example: "Page About Us details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageAboutUs'
 *       404:
 *         description: Page About Us details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', verifyAccessToken, PageAboutUsController.getDetail)

/**
 * @swagger
 * /api/v1/page-about-us/{id}:
 *   put:
 *     summary: Update Page About Us details by ID
 *     description: Update specific fields of the Page About Us section using its ID.
 *     tags: [Page About Us]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page About Us record.
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
 *                 example: "เกี่ยวกับเรา"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English.
 *                 example: "About Us"
 *               slogan:
 *                 type: string
 *                 description: Slogan for the page.
 *                 example: "Excellence in Service"
 *               description_th:
 *                 type: string
 *                 description: Description in Thai.
 *                 example: "รายละเอียดของเราในภาษาไทย"
 *               description_en:
 *                 type: string
 *                 description: Description in English.
 *                 example: "Our details in English."
 *               header_image_id:
 *                 type: integer
 *                 description: ID of the header image.
 *                 example: 102
 *               header_image_url:
 *                 type: string
 *                 description: URL of the header image.
 *                 example: "https://example.com/header.jpg"
 *               about_clinic_image_id:
 *                 type: integer
 *                 description: ID of the about clinic image.
 *                 example: 103
 *               about_clinic_image_url:
 *                 type: string
 *                 description: URL of the about clinic image.
 *                 example: "https://example.com/clinic.jpg"
 *               about_clinic_title_th:
 *                 type: string
 *                 description: About clinic title in Thai.
 *                 example: "ชื่อคลินิกในภาษาไทย"
 *               about_clinic_title_en:
 *                 type: string
 *                 description: About clinic title in English.
 *                 example: "Clinic Title in English"
 *               about_clinic_content_th:
 *                 type: string
 *                 description: About clinic content in Thai.
 *                 example: "เนื้อหาคลินิกในภาษาไทย"
 *               about_clinic_content_en:
 *                 type: string
 *                 description: About clinic content in English.
 *                 example: "Clinic content in English."
 *               about_clinic_year_of_service:
 *                 type: string
 *                 description: Years of service.
 *                 example: "10"
 *               about_clinic_total_service:
 *                 type: string
 *                 description: Total number of services.
 *                 example: "500"
 *               about_clinic_satisfied_customers:
 *                 type: string
 *                 description: Number of satisfied customers.
 *                 example: "1000"
 *     responses:
 *       200:
 *         description: Successfully updated Page About Us details.
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
 *                   example: "Page About Us updated successfully."
 *       404:
 *         description: Page About Us details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', verifyAccessToken, PageAboutUsController.updateDetail)

module.exports = router
