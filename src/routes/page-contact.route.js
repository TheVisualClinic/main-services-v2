const express = require('express')
const PageContactController = require('../controllers/page-contact.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-contact:
 *   get:
 *     summary: Get the Page Contact details
 *     description: Retrieve the details of the Page Contact section.
 *     tags: [Page Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the Page Contact details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 example: true
 *                 description: Status of the request
 *                 message:
 *                   type: string
 *                   example: "Page Contact details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageContact'
 *       404:
 *         description: Page Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, PageContactController.getDetail)

/**
 * @swagger
 * /api/v1/page-contact/{id}:
 *   put:
 *     summary: Update the Page Contact details by ID
 *     description: Update specific fields of the Page Contact section using its ID.
 *     tags: [Page Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Contact section
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
 *                 description: Caption in Thai
 *                 example: "ติดต่อเรา"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English
 *                 example: "Contact Us"
 *               title_th:
 *                 type: string
 *                 description: Title in Thai
 *                 example: "ช่องทางการติดต่อ"
 *               title_en:
 *                 type: string
 *                 description: Title in English
 *                 example: "Contact Information"
 *               header_image_id:
 *                 type: integer
 *                 description: ID of the header image
 *                 example: 101
 *               header_image_url:
 *                 type: string
 *                 description: URL of the header image
 *                 example: "https://example.com/header.jpg"
 *               address_th:
 *                 type: string
 *                 description: Address in Thai
 *                 example: "123 หมู่บ้าน ABC กรุงเทพฯ"
 *               address_en:
 *                 type: string
 *                 description: Address in English
 *                 example: "123 ABC Village, Bangkok"
 *               phone_number:
 *                 type: string
 *                 description: Contact phone number
 *                 example: "+66-123-456-789"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact email address
 *                 example: "contact@example.com"
 *               opening_hours_th:
 *                 type: string
 *                 description: Opening hours in Thai
 *                 example: "เปิดทุกวัน 9:00 น. - 18:00 น."
 *               opening_hours_en:
 *                 type: string
 *                 description: Opening hours in English
 *                 example: "Open daily 9:00 AM - 6:00 PM"
 *               social_facebook_label:
 *                 type: string
 *                 description: Label for the Facebook link
 *                 example: "Facebook"
 *               social_facebook_link:
 *                 type: string
 *                 format: uri
 *                 description: Facebook link
 *                 example: "https://facebook.com/yourpage"
 *               social_instagram_label:
 *                 type: string
 *                 description: Label for the Instagram link
 *                 example: "Instagram"
 *               social_instagram_link:
 *                 type: string
 *                 format: uri
 *                 description: Instagram link
 *                 example: "https://instagram.com/yourpage"
 *               social_tiktok_label:
 *                 type: string
 *                 description: Label for the TikTok link
 *                 example: "TikTok"
 *               social_tiktok_link:
 *                 type: string
 *                 format: uri
 *                 description: TikTok link
 *                 example: "https://tiktok.com/@yourpage"
 *               social_line_label:
 *                 type: string
 *                 description: Label for the Line link
 *                 example: "Line"
 *               social_line_link:
 *                 type: string
 *                 format: uri
 *                 description: Line link
 *                 example: "https://line.me/ti/p/yourlineid"
 *     responses:
 *       200:
 *         description: Successfully updated the Page Contact details
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
 *                   example: "Page Contact updated successfully."
 *       404:
 *         description: Page Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, PageContactController.updateDetail)

module.exports = router
