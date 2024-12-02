const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const BlogStorageController = require('../controllers/blogStorage.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

/**
 * @swagger
 * /api/blog/images:
 *   get:
 *     summary: Retrieve a paginated list of stored images
 *     tags: [Blog Storage]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of images
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 images:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogStorage'
 *       500:
 *         description: Internal Server Error
 */
router.get('/images', verifyAccessToken, BlogStorageController.getImageList)

/**
 * @swagger
 * /api/blog/images/{image_id}:
 *   get:
 *     summary: Retrieve an image by its ID
 *     tags: [Blog Storage]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the image to retrieve
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogStorage'
 *       400:
 *         description: image_id is required
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/images/:image_id', verifyAccessToken, BlogStorageController.getImageById)

/**
 * @swagger
 * /api/blog/images/upload:
 *   post:
 *     summary: Upload a new image
 *     tags: [Blog Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogStorage'
 *       400:
 *         description: Invalid file or missing image
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/images/upload',
  verifyAccessToken,
  upload.single('file'),
  BlogStorageController.uploadImage
)

/**
 * @swagger
 * /api/blog/images/upload-multiple:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Blog Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of images to upload
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogStorage'
 *       400:
 *         description: Invalid files or missing images
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/images/upload-multiple',
  verifyAccessToken,
  upload.array('files'),
  BlogStorageController.uploadMultipleImages
)

/**
 * @swagger
 * /api/blog/images/delete:
 *   delete:
 *     summary: Delete an image by image_id
 *     tags: [Blog Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image_id:
 *                 type: integer
 *                 description: The ID of the image to delete
 *                 example: 1
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: image_id is required
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/images/delete', verifyAccessToken, BlogStorageController.deleteImage)

/**
 * @swagger
 * /api/blog/images/delete-multiple:
 *   delete:
 *     summary: Delete multiple images by their image_ids
 *     tags: [Blog Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: The array of image IDs to delete
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       400:
 *         description: image_ids array is required
 *       404:
 *         description: One or more images not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  '/images/delete-multiple',
  verifyAccessToken,
  BlogStorageController.deleteMultipleImages
)

module.exports = router
