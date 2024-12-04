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

/**
 * @swagger
 * /api/v1/website/page/blogs/last-promotions:
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
router.get('/page/blogs/last-promotions', WebsiteController.getLastPromotions)

/**
 * @swagger
 * /api/v1/website/page/blogs/about-our-services:
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
router.get('/page/blogs/about-our-services', WebsiteController.getAboutOurServices)

/**
 * @swagger
 * /api/v1/website/page/blogs/tags:
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
router.get('/page/blogs/tags', WebsiteController.getBlogTagsList)

/**
 * @swagger
 * /api/v1/website/page/blogs/list:
 *   get:
 *     summary: Retrieve a list of blogs with optional search
 *     description: Fetch blogs with optional search, pagination, and associated tags
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for blog title or description
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of blogs to retrieve
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of blogs to skip before starting to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cover_image_url:
 *                     type: string
 *                   title_th:
 *                     type: string
 *                   title_en:
 *                     type: string
 *                   description_th:
 *                     type: string
 *                   description_en:
 *                     type: string
 *                   slug_th:
 *                     type: string
 *                   slug_en:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *       404:
 *         description: Blogs not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/page/blogs/list', WebsiteController.getBlogList)

/**
 * @swagger
 * /api/v1/website/page/blogs/detail:
 *   post:
 *     summary: Retrieve blog detail by slug
 *     description: Fetch blog detail using the provided slug
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 description: The slug of the blog
 *                 example: บางกอก
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/page/blogs/detail', WebsiteController.getBlogDetailBySlug)

/**
 * @swagger
 * /api/v1/website/page/blogs/last-article:
 *   post:
 *     summary: Retrieve the last articles
 *     description: Fetch the latest blogs with an optional focus slug to exclude and limit the number of results.
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notSlug:
 *                 type: string
 *                 description: The slug of the blog to exclude from the results.
 *                 example: example-slug
 *               limit:
 *                 type: integer
 *                 description: The number of blogs to retrieve.
 *                 example: 8
 *     responses:
 *       200:
 *         description: Successfully retrieved the last articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cover_image_url:
 *                     type: string
 *                   title_th:
 *                     type: string
 *                   title_en:
 *                     type: string
 *                   description_th:
 *                     type: string
 *                   description_en:
 *                     type: string
 *                   slug_th:
 *                     type: string
 *                   slug_en:
 *                     type: string
 *       404:
 *         description: Blogs not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/page/blogs/last-article', WebsiteController.getLastArticle)

/**
 * @swagger
 * /api/v1/website/page/promotions:
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
router.get('/page/promotions', WebsiteController.getPromotionsPageData)

/**
 * @swagger
 * /api/v1/website/banner/caption:
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
router.get('/banner/caption', WebsiteController.getCaptionBannerData)

/**
 * @swagger
 * /api/v1/website/page/promotions-list:
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
router.get('/page/promotions-list', WebsiteController.getPromotionsList)

/**
 * @swagger
 * /api/v1/website/page/home:
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
router.get('/page/home', WebsiteController.getHomePageData)

/**
 * @swagger
 * /api/v1/website/banner/about:
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
router.get('/banner/about', WebsiteController.getAboutBannerData)

/**
 * @swagger
 * /api/v1/website/page/service-list:
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
router.get('/page/service-list', WebsiteController.getServicesList)

/**
 * @swagger
 * /api/v1/website/page/doctor-list:
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
router.get('/page/doctor-list', WebsiteController.getDoctorList)

/**
 * @swagger
 * /api/v1/website/page/doctor-list:
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
router.get('/page/services', WebsiteController.getServicesPageData)

/**
 * @swagger
 * /api/v1/website/banner/doctor-list:
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
router.get('/banner/partners', WebsiteController.getPartnerBannerData)

/**
 * @swagger
 * /api/v1/website/page/about-us:
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
router.get('/page/about-us', WebsiteController.getAboutUsPageData)

/**
 * @swagger
 * /api/v1/website/page/medical-team:
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
router.get('/page/medical-team', WebsiteController.getMedicalTeamPageData)

/**
 * @swagger
 * /api/v1/website/page/doctor-detail-list:
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
router.get('/page/doctor-detail-list', WebsiteController.getDoctorDetailList)

/**
 * @swagger
 * /api/v1/website/page/service/detail:
 *   post:
 *     summary: Retrieve blog detail by slug
 *     description: Fetch blog detail using the provided slug
 *     tags: [Website Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 description: The slug of the blog
 *                 example: บางกอก
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/page/service/detail', WebsiteController.getServiceDetailBySlug)

module.exports = router
