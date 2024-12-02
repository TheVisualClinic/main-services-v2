const express = require('express')
const InviteStaffController = require('../controllers/inviteStaff.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Invite Staff
 *   description: API for managing staff invitations (Invite Staff)
 */

/**
 * @swagger
 * /api/invite:
 *   get:
 *     summary: Retrieve a list of invitations
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InviteStaff'
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, InviteStaffController.getInviteList)

/**
 * @swagger
 * /api/invite/joined:
 *   get:
 *     summary: Retrieve a list of joined invitations
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of joined invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InviteStaff'
 *       500:
 *         description: Internal server error
 */
router.get('/joined', verifyAccessToken, InviteStaffController.getInviteJoinedList)

/**
 * @swagger
 * /api/invite:
 *   post:
 *     summary: Create a new invitation for staff
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: staff@example.com
 *                 description: The email address of the staff member to be invited
 *               role_id:
 *                 type: integer
 *                 example: 3
 *                 description: The Role ID of the staff member
 *     responses:
 *       201:
 *         description: Invitation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InviteStaff'
 *       400:
 *         description: Invitation already exists or invalid input
 *       422:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyAccessToken, InviteStaffController.createInvite)

/**
 * @swagger
 * /api/invite/validate/{invite_key}:
 *   get:
 *     summary: Validate an invitation by invite_key
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invite_key
 *         schema:
 *           type: string
 *         required: true
 *         description: The invite key to validate the invitation
 *     responses:
 *       200:
 *         description: Invitation is valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InviteStaff'
 *       410:
 *         description: The invitation is expired or invalid
 *       500:
 *         description: Internal server error
 */
router.get('/validate/:invite_key', InviteStaffController.validateInvite)

/**
 * @swagger
 * /api/invite/accept:
 *   post:
 *     summary: Accept an invitation
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invite_key
 *               - user_id
 *             properties:
 *               invite_key:
 *                 type: string
 *                 description: The invite key to accept the invitation
 *               user_id:
 *                 type: string
 *                 description: The ID of the user accepting the invite
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InviteStaff'
 *       410:
 *         description: The invitation is expired or invalid
 *       500:
 *         description: Internal server error
 */

router.post('/accept', InviteStaffController.acceptInvite)

/**
 * @swagger
 * /api/invite/{invite_id}:
 *   delete:
 *     summary: Delete an invitation
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invite_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the invitation to be deleted
 *     responses:
 *       200:
 *         description: Invitation deleted successfully
 *       404:
 *         description: Invitation not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:invite_id', verifyAccessToken, InviteStaffController.deleteInvite)

/**
 * @swagger
 * /api/invite/resend:
 *   post:
 *     summary: Resend an invitation
 *     tags: [Invite Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invite_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the invitation to be resent
 *     responses:
 *       200:
 *         description: Invitation resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InviteStaff'
 *       404:
 *         description: Invitation not found
 *       500:
 *         description: Internal server error
 */
router.post('/resend', verifyAccessToken, InviteStaffController.resendInvite)

module.exports = router
