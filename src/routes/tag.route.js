const express = require('express')
const TagController = require('../controllers/tag.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/tag:
 *   get:
 *     summary: Retrieve a list of tags
 *     description: This endpoint allows users to retrieve a list of tags.
 *     tags: [Tag Services]
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
 *         name: search
 *         schema:
 *           type: string
 *           example: "Node.js"
 *         description: Search keyword for filtering tags
 *     responses:
 *       200:
 *         description: A list of tags successfully retrieved
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
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Node.js"
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, TagController.getTagList)

/**
 * @swagger
 * /api/v1/tag:
 *   post:
 *     summary: Create a new tag
 *     description: This endpoint allows users to create a new tag.
 *     tags: [Tag Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Node.js"
 *     responses:
 *       201:
 *         description: Tag successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Node.js"
 *       400:
 *         description: Bad request, name is required
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyAccessToken, TagController.createTag)

/**
 * @swagger
 * /api/v1/tag/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     description: This endpoint allows users to update a tag by its ID.
 *     tags: [Tag Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Backend Development"
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Backend Development"
 *       400:
 *         description: Bad request, name is required
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyAccessToken, TagController.updateTag)

/**
 * @swagger
 * /api/v1/tag/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     description: This endpoint allows users to delete a specific tag by ID.
 *     tags: [Tag Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag to delete
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag deleted successfully"
 *       400:
 *         description: Tag ID is required
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyAccessToken, TagController.deleteTag)

/**
 * @swagger
 * /api/v1/tag:
 *   delete:
 *     summary: Delete multiple tags
 *     description: This endpoint allows users to delete multiple tags by their IDs.
 *     tags: [Tag Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Tags deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tags deleted successfully"
 *       400:
 *         description: Bad request, tag IDs are required
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.delete('/', verifyAccessToken, TagController.deleteTags)

module.exports = router
