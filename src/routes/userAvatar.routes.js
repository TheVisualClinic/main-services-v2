const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const UserAvatarController = require('../controllers/userAvatar.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

/**
 * @swagger
 * /api/user/avatar/list:
 *   get:
 *     summary: Retrieve a list of all avatars
 *     tags: [Users Avatar]
 *     description: Get a list of all avatars available in the system. This endpoint does not require any parameters.
 *     responses:
 *       200:
 *         description: A list of avatars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAvatars'
 */
router.get('/avatar/list', verifyAccessToken, UserAvatarController.getAvatarList)

/**
 * @swagger
 * /api/user/avatar/upload:
 *   post:
 *     summary: Upload a new avatar
 *     tags: [Users Avatar]
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
 *                 description: Upload an image file (jpg, jpeg, webp, etc.)
 *             required:
 *               - file
 *             example:
 *               file: (binary)
 *           encoding:
 *             file:
 *               contentType:
 *                 - image/jpeg
 *                 - image/webp
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAvatars'
 */
router.post(
  '/avatar/upload',
  verifyAccessToken,
  upload.single('file'),
  UserAvatarController.uploadAvatar
)

/**
 * @swagger
 * /api/user/avatar/change:
 *   post:
 *     summary: Change user avatar
 *     tags: [Users Avatar]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar_id:
 *                 type: integer
 *                 description: ID of the avatar to be replaced.
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new avatar file to be uploaded (jpg, jpeg, webp).
 *             required:
 *               - avatar_id
 *               - file
 *             example:
 *               avatar_id: 1
 *               file: (binary)
 *     responses:
 *       200:
 *         description: Avatar changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAvatars'
 */
router.post(
  '/avatar/change',
  verifyAccessToken,
  upload.single('file'),
  UserAvatarController.changeAvatar
)

/**
 * @swagger
 * /api/user/avatar/permanent:
 *   delete:
 *     summary: Permanently delete an avatar
 *     tags: [Users Avatar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar_id:
 *                 type: integer
 *                 description: ID of the avatar to be deleted.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Avatar permanently deleted successfully
 */
router.delete('/avatar/permanent', verifyAccessToken, UserAvatarController.permanentlyDeleteAvatar)

module.exports = router
