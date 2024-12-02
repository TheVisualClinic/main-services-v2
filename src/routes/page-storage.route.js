const express = require('express')
const PageStorageController = require('../controllers/page-storage.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')
const { upload } = require('../utils/multerUtils')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-storage:
 *   get:
 *     summary: Retrieve a paginated list of page images
 *     description: Fetch a list of page images with pagination and optional search parameter.
 *     tags: [Page Storage Services]
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
 *         description: Search term to filter page images by name
 *     responses:
 *       200:
 *         description: A list of page images
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
router.get('/', verifyAccessToken, PageStorageController.getPageStorage)

/**
 * @swagger
 * /api/v1/page-storage:
 *   post:
 *     summary: Upload a new page image
 *     description: Upload an image file to the page storage.
 *     tags: [Page Storage Services]
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
 *         description: Page image uploaded successfully
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
router.post('/', verifyAccessToken, upload.single('image_file'), PageStorageController.createImage)

/**
 * @swagger
 * /api/v1/page-storage/update-name:
 *   patch:
 *     summary: Update the name of an existing page image
 *     description: Modify the name of a page image in storage.
 *     tags: [Page Storage Services]
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
 *         description: Image name updated successfully
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
router.patch('/update-name', verifyAccessToken, PageStorageController.updateNewImageName)

/**
 * @swagger
 * /api/v1/page-storage/{id}:
 *   delete:
 *     summary: Delete a page image
 *     description: Remove a page image from storage by its ID.
 *     tags: [Page Storage Services]
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
router.delete('/:id', verifyAccessToken, PageStorageController.deleteImage)

module.exports = router
