const express = require('express')
const PagePromotionsController = require('../controllers/page-promotions.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-promotions:
 *   get:
 *     summary: Get the first Page Promotion details
 *     description: Retrieve the first Page Promotion details without including any items.
 *     tags: [Page Promotions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the promotion details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved the promotion details"
 *                 data:
 *                   $ref: '#/components/schemas/PagePromotions'
 *       404:
 *         description: Page Promotion not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, PagePromotionsController.getPagePromotionsDetail)

/**
 * @swagger
 * /api/v1/page-promotions/{id}:
 *   put:
 *     summary: Update the Page Promotions details by ID
 *     description: Update specific fields of the Page Promotions section using its ID.
 *     tags: [Page Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Promotions section
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
 *                 example: "โปรโมชั่นพิเศษ"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English
 *                 example: "Special Promotions"
 *               title_th:
 *                 type: string
 *                 description: Title in Thai
 *                 example: "โปรโมชันที่คุณไม่ควรพลาด"
 *               title_en:
 *                 type: string
 *                 description: Title in English
 *                 example: "Promotions You Shouldn't Miss"
 *     responses:
 *       200:
 *         description: Successfully updated the Page Promotions details
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
 *                   example: "Successfully updated the promotion details"
 *                 data:
 *                   $ref: '#/components/schemas/PagePromotions'
 *       404:
 *         description: Page Promotions not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, PagePromotionsController.updatePagePromotionsDetail)

/**
 * @swagger
 * /api/v1/page-promotions/{pagePromotionsId}/list:
 *   get:
 *     summary: Get promotion list with items and benefits
 *     description: Retrieve a list of promotion items and their benefits for a specific promotions page.
 *     tags: [Page Promotions]
 *     parameters:
 *       - name: pagePromotionsId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotions page
 *     responses:
 *       200:
 *         description: Successfully retrieved the promotion list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved the promotion list"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PagePromotionsItem'
 */
router.get('/:pagePromotionsId/list', verifyAccessToken, PagePromotionsController.getPromotionList)

/**
 * @swagger
 * /api/v1/page-promotions/{promotionId}/detail:
 *   get:
 *     summary: Get promotion details with items and benefits
 *     description: Retrieve the details of a specific promotion item, including its benefits.
 *     tags: [Page Promotions]
 *     parameters:
 *       - name: promotionId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotion item
 *     responses:
 *       200:
 *         description: Successfully retrieved the promotion details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully retrieved the promotion details"
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/PagePromotionsItem'
 *       404:
 *         description: Promotion not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Promotion not found"
 */
router.get('/:promotionId/detail', verifyAccessToken, PagePromotionsController.getPromotionDetail)

/**
 * @swagger
 * /api/v1/page-promotions/{pagePromotionsId}/items:
 *   post:
 *     summary: Create a promotion item
 *     description: Add a new item to the promotions page.
 *     tags: [Page Promotions Items]
 *     parameters:
 *       - name: pagePromotionsId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotions page
 *     responses:
 *       200:
 *         description: Successfully created the promotion item.
 */
router.post(
  '/:pagePromotionsId/items',
  verifyAccessToken,
  PagePromotionsController.createPromotionItem
)

/**
 * @swagger
 * /api/v1/page-promotions/items/{itemId}:
 *   put:
 *     summary: Update a promotion item
 *     description: Modify the details of a specific promotion item by its ID.
 *     tags: [Page Promotions Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the promotion item to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title_th:
 *                 type: string
 *                 nullable: true
 *                 description: Title of the promotion item in Thai
 *                 example: "อัพเดทโปรโมชั่นใหม่"
 *               title_en:
 *                 type: string
 *                 nullable: true
 *                 description: Title of the promotion item in English
 *                 example: "Updated Promotion"
 *               description_th:
 *                 type: string
 *                 nullable: true
 *                 description: Description of the promotion item in Thai
 *                 example: "อัพเดทรายละเอียดโปรโมชั่นใหม่"
 *               description_en:
 *                 type: string
 *                 nullable: true
 *                 description: Description of the promotion item in English
 *                 example: "Updated promotion details"
 *               promotion_price:
 *                 type: integer
 *                 description: The promotional price
 *                 example: 1500
 *               item_image_id:
 *                 type: integer
 *                 nullable: true
 *                 description: ID of the image associated with the promotion item
 *                 example: 123
 *               item_image_url:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: URL of the image associated with the promotion item
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the promotion item
 *       404:
 *         description: Promotion item not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/items/:itemId', verifyAccessToken, PagePromotionsController.updatePromotionItem)

/**
 * @swagger
 * /api/v1/page-promotions/items/{itemId}/reorder:
 *   put:
 *     summary: Reorder a promotion item
 *     description: Update the order of a promotion item within its group.
 *     tags: [Page Promotions Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the promotion item to reorder
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_order:
 *                 type: integer
 *                 description: The new order for the promotion item
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully reordered the promotion item
 *       404:
 *         description: Promotion item not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/items/:itemId/reorder',
  verifyAccessToken,
  PagePromotionsController.reorderPromotionItem
)

/**
 * @swagger
 * /api/v1/page-promotions/items/{itemId}:
 *   delete:
 *     summary: Delete a promotion item
 *     description: Remove a specific promotion item.
 *     tags: [Page Promotions Items]
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotion item
 *     responses:
 *       200:
 *         description: Successfully deleted the promotion item.
 */
router.delete('/items/:itemId', verifyAccessToken, PagePromotionsController.deletePromotionItem)

/**
 * @swagger
 * /api/v1/page-promotions/items/{pagePromotionsItemId}/benefits:
 *   post:
 *     summary: Create a promotion benefit
 *     description: Add a new benefit to a promotion item.
 *     tags: [Page Promotions Benefits]
 *     parameters:
 *       - name: pagePromotionsItemId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotion item
 *     responses:
 *       200:
 *         description: Successfully created the promotion benefit.
 */
router.post(
  '/items/:pagePromotionsItemId/benefits',
  verifyAccessToken,
  PagePromotionsController.createPromotionBenefit
)

/**
 * @swagger
 * /api/v1/page-promotions/benefits/{benefitId}:
 *   put:
 *     summary: Update a promotion benefit
 *     description: Modify the details of a specific promotion benefit by its ID.
 *     tags: [Page Promotions Benefits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: benefitId
 *         in: path
 *         required: true
 *         description: ID of the promotion benefit to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text_th:
 *                 type: string
 *                 nullable: true
 *                 description: Benefit text in Thai
 *                 example: "อัพเดทส่วนลดพิเศษ"
 *               text_en:
 *                 type: string
 *                 nullable: true
 *                 description: Benefit text in English
 *                 example: "Updated special discount"
 *     responses:
 *       200:
 *         description: Successfully updated the promotion benefit
 *       404:
 *         description: Promotion benefit not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/benefits/:benefitId',
  verifyAccessToken,
  PagePromotionsController.updatePromotionBenefit
)

/**
 * @swagger
 * /api/v1/page-promotions/benefits/{benefitId}/reorder:
 *   put:
 *     summary: Reorder a promotion benefit
 *     description: Update the order of a promotion benefit within its group.
 *     tags: [Page Promotions Benefits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: benefitId
 *         in: path
 *         required: true
 *         description: ID of the promotion benefit to reorder
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_order:
 *                 type: integer
 *                 description: The new order for the promotion benefit
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully reordered the promotion benefit
 *       404:
 *         description: Promotion benefit not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/benefits/:benefitId/reorder',
  verifyAccessToken,
  PagePromotionsController.reorderPromotionBenefit
)

/**
 * @swagger
 * /api/v1/page-promotions/benefits/{benefitId}:
 *   delete:
 *     summary: Delete a promotion benefit
 *     description: Remove a specific promotion benefit.
 *     tags: [Page Promotions Benefits]
 *     parameters:
 *       - name: benefitId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the promotion benefit
 *     responses:
 *       200:
 *         description: Successfully deleted the promotion benefit.
 */
router.delete(
  '/benefits/:benefitId',
  verifyAccessToken,
  PagePromotionsController.deletePromotionBenefit
)

module.exports = router
