const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const PublicStorageController = require('../controllers/publicStorage.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

/**
 * @swagger
 * /api/public/images:
 *   get:
 *     summary: Retrieve a list of all stored images
 *     tags: [Public Storage]
 *     responses:
 *       200:
 *         description: A list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PublicStorage'
 *       500:
 *         description: Internal Server Error
 */
router.get('/images', verifyAccessToken, PublicStorageController.getImageList)

/**
 * @swagger
 * /api/public/images/upload:
 *   post:
 *     summary: Upload a new image
 *     tags: [Public Storage]
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
 *               $ref: '#/components/schemas/PublicStorage'
 *       400:
 *         description: Invalid file or missing image
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/images/upload',
  verifyAccessToken,
  upload.single('file'),
  PublicStorageController.uploadImage
)

/**
 * @swagger
 * /api/public/images/delete:
 *   delete:
 *     summary: Delete an image by image_id
 *     tags: [Public Storage]
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
router.delete('/images/delete', verifyAccessToken, PublicStorageController.deleteImage)

module.exports = router
