const express = require('express')
const PageReviewsController = require('../controllers/page-reviews.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-reviews:
 *   get:
 *     summary: Get the Page Reviews details
 *     description: Retrieve the details of the Page Reviews section.
 *     tags: [Page Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the Page Reviews details
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
 *                   example: "Page Reviews details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageReviews'
 *       404:
 *         description: Page Reviews not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, PageReviewsController.getPageReviewsDetail)

/**
 * @swagger
 * /api/v1/page-reviews/{id}:
 *   put:
 *     summary: Update the Page Reviews details by ID
 *     description: Update specific fields of the Page Reviews section using its ID.
 *     tags: [Page Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Reviews section
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
 *                 example: "รีวิวจากลูกค้า"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English
 *                 example: "Customer Reviews"
 *               title_th:
 *                 type: string
 *                 description: Title in Thai
 *                 example: "ความเห็นจากลูกค้า"
 *               title_en:
 *                 type: string
 *                 description: Title in English
 *                 example: "Customer Feedback"
 *     responses:
 *       200:
 *         description: Successfully updated the Page Reviews details
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
 *                   example: "Page Reviews updated successfully."
 *       404:
 *         description: Page Reviews not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', verifyAccessToken, PageReviewsController.updatePageReviewsDetail)

/**
 * @swagger
 * /api/v1/page-reviews/{reviewPageId}/group-list:
 *   get:
 *     summary: Get the review groups and items for a specific Page Review
 *     description: Retrieve all review groups and their associated items for a specific Page Review.
 *     tags: [Page Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reviewPageId
 *         in: path
 *         required: true
 *         description: ID of the Page Review
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PageReviewsGroup'
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:reviewPageId/group-list', verifyAccessToken, PageReviewsController.getGroupList)

/**
 * @swagger
 * /api/v1/page-reviews/{groupId}/item-list:
 *   get:
 *     summary: Get the review items for a specific review group
 *     description: Retrieve all review items for a specific review group using the group ID.
 *     tags: [Page Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: ID of the review group
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the review items list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PageReviewsGroupItem'
 *       400:
 *         description: Group ID is required
 *       404:
 *         description: Review group not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:groupId/item-list', verifyAccessToken, PageReviewsController.getReviewsList)

/**
 * @swagger
 * /api/v1/page-reviews/{reviewPageId}/groups:
 *   post:
 *     summary: Create a new group for a Page Review
 *     description: Automatically create a group with an incremented order for the specified Page Review.
 *     tags: [Page Reviews Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reviewPageId
 *         in: path
 *         required: true
 *         description: ID of the Page Review
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully created the group
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
 *                   example: "Group created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageReviewsGroup'
 *       404:
 *         description: Page Review not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/:reviewPageId/groups', verifyAccessToken, PageReviewsController.createGroup)

/**
 * @swagger
 * /api/v1/page-reviews/groups/{groupId}:
 *   put:
 *     summary: Update a group by ID
 *     description: Modify details of a specific group by its ID.
 *     tags: [Page Reviews Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name_th:
 *                 type: string
 *                 description: Group name in Thai
 *                 example: "แก้ไขกลุ่ม"
 *               group_name_en:
 *                 type: string
 *                 description: Group name in English
 *                 example: "Edited Group"
 *     responses:
 *       200:
 *         description: Successfully updated the group
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/groups/:groupId', verifyAccessToken, PageReviewsController.updateGroup)

/**
 * @swagger
 * /api/v1/page-reviews/groups/{groupId}/reorder:
 *   put:
 *     summary: Reorder a group
 *     description: Change the order of a specific group within its Page Review.
 *     tags: [Page Reviews Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: ID of the group to reorder
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newOrder:
 *                 type: integer
 *                 description: The new order for the group
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully reordered the group
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
 *                   example: "Group reordered successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageReviewsGroup'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/groups/:groupId/reorder', verifyAccessToken, PageReviewsController.reorderGroup)

/**
 * @swagger
 * /api/v1/page-reviews/groups/{groupId}:
 *   delete:
 *     summary: Delete a group by ID
 *     description: Remove a specific group by its ID and reorder the remaining groups.
 *     tags: [Page Reviews Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: ID of the group to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the group
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
 *                   example: "Group deleted successfully."
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/groups/:groupId', verifyAccessToken, PageReviewsController.deleteGroup)

/**
 * @swagger
 * /api/v1/page-reviews/groups/{groupId}/items:
 *   post:
 *     summary: Create a new group item
 *     description: Automatically create an item with an incremented order for the specified group.
 *     tags: [Page Reviews Group Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully created the group item
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
 *                   example: "Group item created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageReviewsGroupItems'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/groups/:groupId/items', verifyAccessToken, PageReviewsController.createGroupItem)

/**
 * @swagger
 * /api/v1/page-reviews/groups/items/{itemId}:
 *   put:
 *     summary: Update a group item by ID
 *     description: Modify details of a specific group item by its ID.
 *     tags: [Page Reviews Group Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the group item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_order:
 *                 type: integer
 *                 description: Order of the item within the group
 *                 example: 2
 *               item_image_id:
 *                 type: integer
 *                 description: ID of the item image
 *                 example: 202
 *               item_image_url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the item image
 *                 example: "https://example.com/new-item-image.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the group item
 *       404:
 *         description: Group item not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/groups/items/:itemId', verifyAccessToken, PageReviewsController.updateGroupItem)

/**
 * @swagger
 * /api/v1/page-reviews/groups/items/{itemId}/reorder:
 *   put:
 *     summary: Reorder a group item
 *     description: Change the order of a group item within its group.
 *     tags: [Page Reviews Group Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the group item
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
 *                 description: The new order for the item
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully reordered the group item
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
 *                   example: "Group item reordered successfully."
 *       404:
 *         description: Group item not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  '/groups/items/:itemId/reorder',
  verifyAccessToken,
  PageReviewsController.reorderGroupItem
)

/**
 * @swagger
 * /api/v1/page-reviews/groups/items/{itemId}:
 *   delete:
 *     summary: Delete a group item
 *     description: Remove a specific group item by its ID.
 *     tags: [Page Reviews Group Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the group item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the group item
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
 *                   example: "Group item deleted successfully."
 *       404:
 *         description: Group item not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/groups/items/:itemId', PageReviewsController.deleteGroupItem)

module.exports = router
