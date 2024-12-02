const express = require('express')
const BlogStorageController = require('../controllers/blog-storage.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')
const { upload } = require('../utils/multerUtils')

const router = express.Router()

/**
 * @swagger
 * /api/v1/blog-storage:
 *   get:
 *     summary: Retrieve a paginated list of blog images
 *     description: Fetch a list of blog images with pagination and optional search parameter.
 *     tags: [Blog Storage Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter blog images by name
 *     responses:
 *       200:
 *         description: A list of blog images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image_id:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                       image_name:
 *                         type: string
 *       401:
 *         description: Unauthorized, access token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, BlogStorageController.getBlogStorage)

/**
 * @swagger
 * /api/v1/blog-storage:
 *   post:
 *     summary: Upload a new blog image
 *     description: Upload an image file to the blog storage.
 *     tags: [Blog Storage Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image_file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *             required:
 *               - image_file
 *     responses:
 *       201:
 *         description: Blog image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     image_url:
 *                       type: string
 *                       description: URL or path of the uploaded image
 *       400:
 *         description: Missing required file
 *       500:
 *         description: Internal Server Error
 */
router.post('/', verifyAccessToken, upload.single('image_file'), BlogStorageController.createImage)

/**
 * @swagger
 * /api/v1/blog-storage/update-name:
 *   patch:
 *     summary: Update the name of an existing blog image
 *     description: Modify the name of a blog image in storage.
 *     tags: [Blog Storage Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storage_id:
 *                 type: integer
 *                 description: Identifier of the storage item to be updated
 *               new_image_name:
 *                 type: string
 *                 description: New name for the image
 *             required:
 *               - storage_id
 *               - new_image_name
 *     responses:
 *       200:
 *         description: New Image name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     storage_id:
 *                       type: string
 *                     new_image_name:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.patch('/update-name', verifyAccessToken, BlogStorageController.updateNewImageName)

/**
 * @swagger
 * /api/v1/blog-storage/{id}:
 *   delete:
 *     summary: Delete a blog image
 *     description: Remove a blog image from storage by its ID.
 *     tags: [Blog Storage Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the image to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *       400:
 *         description: Missing required image ID
 *       500:
 *         description: Failed to delete image
 */
router.delete('/:id', verifyAccessToken, BlogStorageController.deleteImage)

module.exports = router
