const express = require('express')
const CategoryController = require('../controllers/category.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: This endpoint allows users to retrieve a list of categories.
 *     tags: [Category Services]
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
 *         description: Search keyword for filtering categories
 *     responses:
 *       200:
 *         description: A list of categories successfully retrieved
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
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category_id:
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
router.get('/', verifyAccessToken, CategoryController.getCategoryList)

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     description: This endpoint allows users to create a new category.
 *     tags: [Category Services]
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
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
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
router.post('/', verifyAccessToken, CategoryController.createCategory)

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: This endpoint allows users to update a category by its ID.
 *     tags: [Category Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
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
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Backend Development"
 *       400:
 *         description: Bad request, name is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyAccessToken, CategoryController.updateCategory)

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: This endpoint allows users to delete a specific category by ID.
 *     tags: [Category Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       400:
 *         description: Category ID is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyAccessToken, CategoryController.deleteCategory)

/**
 * @swagger
 * /api/v1/category:
 *   delete:
 *     summary: Delete multiple categories
 *     description: This endpoint allows users to delete multiple categories by their IDs.
 *     tags: [Category Services]
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
 *         description: Categories deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categories deleted successfully"
 *       400:
 *         description: Bad request, category IDs are required
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.delete('/', verifyAccessToken, CategoryController.deleteCategories)

module.exports = router
