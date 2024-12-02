const express = require('express')
const WebsiteController = require('../controllers/website.controller')

const router = express.Router()

/**
 * @swagger
 * /api/v1/website/footer:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/footer', WebsiteController.getFooterData)

/**
 * @swagger
 * /api/v1/website/page/contact:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/contact', WebsiteController.getContactPageData)

/**
 * @swagger
 * /api/v1/website/page/reviews:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/reviews', WebsiteController.getReviewsPageData)

/**
 * @swagger
 * /api/v1/website/page/reviews-banner:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/reviews-banner', WebsiteController.getReviewsBannerData)

/**
 * @swagger
 * /api/v1/website/page/reviews-list:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/reviews-list', WebsiteController.getReviewList)

/**
 * @swagger
 * /api/v1/website/page/blogs:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/blogs', WebsiteController.getBlogsPageData)

/**
 * @swagger
 * /api/v1/website/page/social-banner:
 *   get:
 *     summary: xxxxx
 *     description: xxxxxxxxx
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/social-banner', WebsiteController.getSocialBannerData)

module.exports = router
