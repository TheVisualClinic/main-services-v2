const express = require('express')
const PageHomeController = require('../controllers/page-home.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-home:
 *   get:
 *     summary: Get Page Home details
 *     description: Retrieve details for the Page Home section.
 *     tags: [Page Home]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Page Home details.
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
 *                   example: "Page Home details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageHome'
 *       404:
 *         description: Page Home details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', verifyAccessToken, PageHomeController.getDetail)

/**
 * @swagger
 * /api/v1/page-home/{id}:
 *   put:
 *     summary: Update Page Home details by ID
 *     description: Update specific fields of the Page Home section using its ID.
 *     tags: [Page Home]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Home record.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hero_image_id:
 *                 type: integer
 *                 description: ID of the hero image.
 *                 example: 101
 *               hero_image_url:
 *                 type: string
 *                 description: URL of the hero image.
 *                 example: "https://example.com/hero.jpg"
 *               hero_slogan_th:
 *                 type: string
 *                 description: Slogan in Thai for the hero section.
 *                 example: "สุขภาพดีเริ่มต้นที่นี่"
 *               hero_slogan_en:
 *                 type: string
 *                 description: Slogan in English for the hero section.
 *                 example: "Good health starts here."
 *               hero_content_th:
 *                 type: string
 *                 description: Content in Thai for the hero section.
 *                 example: "รายละเอียดสุขภาพดีในภาษาไทย"
 *               hero_content_en:
 *                 type: string
 *                 description: Content in English for the hero section.
 *                 example: "Details of good health in English."
 *               section_medical_team_caption_th:
 *                 type: string
 *                 description: Caption in Thai for the medical team section.
 *                 example: "ทีมแพทย์ผู้เชี่ยวชาญ"
 *               section_medical_team_caption_en:
 *                 type: string
 *                 description: Caption in English for the medical team section.
 *                 example: "Expert Medical Team"
 *               section_medical_team_title_th:
 *                 type: string
 *                 description: Title in Thai for the medical team section.
 *                 example: "แพทย์ผู้เชี่ยวชาญด้านสุขภาพ"
 *               section_medical_team_title_en:
 *                 type: string
 *                 description: Title in English for the medical team section.
 *                 example: "Health Specialist Doctors"
 *               middle_image_id:
 *                 type: integer
 *                 description: ID of the middle image.
 *                 example: 202
 *               middle_image_url:
 *                 type: string
 *                 description: URL of the middle image.
 *                 example: "https://example.com/middle.jpg"
 *               section_vdo_slogan:
 *                 type: string
 *                 description: Slogan for the video section.
 *                 example: "ชมวิดีโอสุขภาพ"
 *               section_vdo_content_th:
 *                 type: string
 *                 description: Content in Thai for the video section.
 *                 example: "วิดีโอเกี่ยวกับสุขภาพในภาษาไทย"
 *               section_vdo_content_en:
 *                 type: string
 *                 description: Content in English for the video section.
 *                 example: "Videos about health in English."
 *               section_vdo_link:
 *                 type: string
 *                 description: Link to the video section.
 *                 example: "https://youtube.com/yourvideo"
 *               section_services_caption_th:
 *                 type: string
 *                 description: Caption in Thai for the services section.
 *                 example: "บริการของเรา"
 *               section_services_caption_en:
 *                 type: string
 *                 description: Caption in English for the services section.
 *                 example: "Our Services"
 *               section_services_title_th:
 *                 type: string
 *                 description: Title in Thai for the services section.
 *                 example: "รายละเอียดบริการในภาษาไทย"
 *               section_services_title_en:
 *                 type: string
 *                 description: Title in English for the services section.
 *                 example: "Details of our services in English."
 *     responses:
 *       200:
 *         description: Successfully updated Page Home details.
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
 *                   example: "Page Home updated successfully."
 *       404:
 *         description: Page Home details not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', verifyAccessToken, PageHomeController.updateDetail)

module.exports = router
