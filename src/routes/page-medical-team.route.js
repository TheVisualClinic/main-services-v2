const express = require('express')
const PageMedicalTeamController = require('../controllers/page-medical-team.controller')
const { verifyAccessToken } = require('../middleware/guard.middleware')

const router = express.Router()

/**
 * @swagger
 * /api/v1/page-medical-team:
 *   get:
 *     summary: Get the Page Medical Team details
 *     description: Retrieve the details of the Page Medical Team section.
 *     tags: [Page Medical Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the Page Medical Team details.
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
 *                   example: "Page Medical Team details retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageMedicalTeam'
 *       404:
 *         description: Page Medical Team not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', verifyAccessToken, PageMedicalTeamController.getPageMedicalTeamDetail)

/**
 * @swagger
 * /api/v1/page-medical-team/{id}:
 *   put:
 *     summary: Update the Page Medical Team details by ID
 *     description: Update specific fields of the Page Medical Team section using its ID.
 *     tags: [Page Medical Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Page Medical Team section.
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
 *                 description: Caption in Thai.
 *                 example: "ทีมแพทย์ของเรา"
 *               caption_en:
 *                 type: string
 *                 description: Caption in English.
 *                 example: "Our Medical Team"
 *               title_th:
 *                 type: string
 *                 description: Title in Thai.
 *                 example: "เกี่ยวกับทีมแพทย์"
 *               title_en:
 *                 type: string
 *                 description: Title in English.
 *                 example: "About Our Medical Team"
 *               header_image_id:
 *                 type: integer
 *                 description: ID of the header image.
 *                 example: 101
 *               header_image_url:
 *                 type: string
 *                 description: URL of the header image.
 *                 example: "https://example.com/header.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the Page Medical Team details.
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
 *                   example: "Page Medical Team updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/PageMedicalTeam'
 *       404:
 *         description: Page Medical Team not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', verifyAccessToken, PageMedicalTeamController.updatePageMedicalTeamDetail)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{pageMedicalTeamId}:
 *   get:
 *     summary: Get the list of doctors
 *     description: Retrieve the list of doctors associated with a specific Page Medical Team.
 *     tags: [Page Medical Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pageMedicalTeamId
 *         in: query
 *         required: true
 *         description: ID of the Page Medical Team.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the doctor list.
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
 *                   example: "Doctor list retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: No doctors found.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  '/doctors/:pageMedicalTeamId',
  verifyAccessToken,
  PageMedicalTeamController.getDoctorList
)

/**
 * @swagger
 * /api/v1/page-medical-team/certificates/{pageMedicalTeamId}:
 *   get:
 *     summary: Get the list of certificates
 *     description: Retrieve the list of certificates associated with a specific Page Medical Team.
 *     tags: [Page Medical Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pageMedicalTeamId
 *         in: query
 *         required: true
 *         description: ID of the Page Medical Team.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the certificates list.
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
 *                   example: "Certificates list retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: No certificates found.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  '/certificates/:pageMedicalTeamId',
  verifyAccessToken,
  PageMedicalTeamController.getCertificatesList
)

/**
 * @swagger
 * /api/v1/page-medical-team/prides/{pageMedicalTeamId}:
 *   get:
 *     summary: Get the list of prides
 *     description: Retrieve the list of prides associated with a specific Page Medical Team.
 *     tags: [Page Medical Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pageMedicalTeamId
 *         in: query
 *         required: true
 *         description: ID of the Page Medical Team.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the pride list.
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
 *                   example: "Pride list retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pride'
 *       404:
 *         description: No prides found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/prides/:pageMedicalTeamId', verifyAccessToken, PageMedicalTeamController.getPrideList)

/**
 * @swagger
 * /api/v1/page-medical-team/certificates:
 *   post:
 *     summary: Create a new certificate
 *     description: Add a new certificate to a specific Page Medical Team.
 *     tags: [Page Medical Team - Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully created the certificate.
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
 *                   example: "Certificate created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Certificate'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/certificates', verifyAccessToken, PageMedicalTeamController.createCertificate)

/**
 * @swagger
 * /api/v1/page-medical-team/certificates/{id}:
 *   put:
 *     summary: Update a certificate
 *     description: Update the details of an existing certificate by its ID.
 *     tags: [Page Medical Team - Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to update.
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
 *                 description: Text in Thai for the certificate.
 *                 example: "ใบรับรองคุณภาพ"
 *               text_en:
 *                 type: string
 *                 description: Text in English for the certificate.
 *                 example: "Quality Certificate"
 *     responses:
 *       200:
 *         description: Successfully updated the certificate.
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
 *                   example: "Certificate updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/certificates/:id', verifyAccessToken, PageMedicalTeamController.updateCertificate)

/**
 * @swagger
 * /api/v1/page-medical-team/certificates/{id}/reorder:
 *   put:
 *     summary: Reorder a certificate
 *     description: Update the order of a certificate in the list.
 *     tags: [Page Medical Team - Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to reorder.
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
 *                 description: The new order for the certificate.
 *                 example: 2
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully reordered the certificate.
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
 *                   example: "Certificate reordered successfully."
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  '/certificates/:id/reorder',
  verifyAccessToken,
  PageMedicalTeamController.reorderCertificate
)

/**
 * @swagger
 * /api/v1/page-medical-team/certificates/{id}:
 *   delete:
 *     summary: Delete a certificate
 *     description: Remove a certificate by its ID.
 *     tags: [Page Medical Team - Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to delete.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the certificate.
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
 *                   example: "Certificate deleted successfully."
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/certificates/:id', verifyAccessToken, PageMedicalTeamController.deleteCertificate)

/**
 * @swagger
 * /api/v1/page-medical-team/prides:
 *   post:
 *     summary: Create a new pride
 *     description: Add a new pride to a specific Page Medical Team.
 *     tags: [Page Medical Team - Prides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully created the pride.
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
 *                   example: "Pride created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Pride'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/prides', verifyAccessToken, PageMedicalTeamController.createPride)

/**
 * @swagger
 * /api/v1/page-medical-team/prides/{id}:
 *   put:
 *     summary: Update a pride
 *     description: Update the details of an existing pride by its ID.
 *     tags: [Page Medical Team - Prides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the pride to update.
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
 *                 description: Text in Thai for the pride.
 *                 example: "รางวัลความสำเร็จ"
 *               text_en:
 *                 type: string
 *                 description: Text in English for the pride.
 *                 example: "Achievement Award"
 *     responses:
 *       200:
 *         description: Successfully updated the pride.
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
 *                   example: "Pride updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Pride'
 *       404:
 *         description: Pride not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/prides/:id', verifyAccessToken, PageMedicalTeamController.updatePride)

/**
 * @swagger
 * /api/v1/page-medical-team/prides/{id}/reorder:
 *   put:
 *     summary: Reorder a pride
 *     description: Update the order of a pride in the list.
 *     tags: [Page Medical Team - Prides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the pride to reorder.
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
 *                 description: The new order for the pride.
 *                 example: 2
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully reordered the pride.
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
 *                   example: "Pride reordered successfully."
 *       404:
 *         description: Pride not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/prides/:id/reorder', verifyAccessToken, PageMedicalTeamController.reorderPride)

/**
 * @swagger
 * /api/v1/page-medical-team/prides/{id}:
 *   delete:
 *     summary: Delete a pride
 *     description: Remove a pride by its ID.
 *     tags: [Page Medical Team - Prides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the pride to delete.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the pride.
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
 *                   example: "Pride deleted successfully."
 *       404:
 *         description: Pride not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/prides/:id', verifyAccessToken, PageMedicalTeamController.deletePride)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Add a new doctor to a specific Page Medical Team.
 *     tags: [Page Medical Team - Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully created the doctor.
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
 *                   example: "Doctor created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/doctors', verifyAccessToken, PageMedicalTeamController.createDoctor)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{id}:
 *   put:
 *     summary: Update a doctor
 *     description: Update the details of an existing doctor by its ID.
 *     tags: [Page Medical Team - Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_th:
 *                 type: string
 *                 description: Doctor's name in Thai.
 *                 example: "นพ. สมชาย"
 *               name_en:
 *                 type: string
 *                 description: Doctor's name in English.
 *                 example: "Dr. Somchai"
 *               position_th:
 *                 type: string
 *                 description: Position in Thai.
 *                 example: "ศัลยแพทย์"
 *               position_en:
 *                 type: string
 *                 description: Position in English.
 *                 example: "Surgeon"
 *     responses:
 *       200:
 *         description: Successfully updated the doctor.
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
 *                   example: "Doctor updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/doctors/:id', verifyAccessToken, PageMedicalTeamController.updateDoctor)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{id}/reorder:
 *   put:
 *     summary: Reorder a doctor
 *     description: Update the order of a doctor in the list.
 *     tags: [Page Medical Team - Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor to reorder.
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
 *                 description: The new order for the doctor.
 *                 example: 2
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully reordered the doctor.
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
 *                   example: "Doctor reordered successfully."
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/doctors/:id/reorder', verifyAccessToken, PageMedicalTeamController.reorderDoctor)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     description: Remove a doctor by its ID.
 *     tags: [Page Medical Team - Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the doctor to delete.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageMedicalTeamId:
 *                 type: integer
 *                 description: The ID of the Page Medical Team.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the doctor.
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
 *                   example: "Doctor deleted successfully."
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/doctors/:id', verifyAccessToken, PageMedicalTeamController.deleteDoctor)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{doctorId}/skills:
 *   post:
 *     summary: Create a new skill for a doctor
 *     description: Add a new skill to a specific doctor in the Page Medical Team.
 *     tags: [Page Medical Team - Doctor Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully created the skill.
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
 *                   example: "Skill created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorSkill'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post(
  '/doctors/:doctorId/skills',
  verifyAccessToken,
  PageMedicalTeamController.createDoctorSkill
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/skills/{id}:
 *   put:
 *     summary: Update a skill
 *     description: Update the details of an existing skill for a doctor.
 *     tags: [Page Medical Team - Doctor Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the skill to update.
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
 *                 description: Skill description in Thai.
 *                 example: "ความสามารถพิเศษ"
 *               text_en:
 *                 type: string
 *                 description: Skill description in English.
 *                 example: "Special Skill"
 *     responses:
 *       200:
 *         description: Successfully updated the skill.
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
 *                   example: "Skill updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorSkill'
 *       404:
 *         description: Skill not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/doctors/skills/:id', verifyAccessToken, PageMedicalTeamController.updateDoctorSkill)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/skills/{id}/reorder:
 *   put:
 *     summary: Reorder a skill
 *     description: Update the order of a skill in the list for a specific doctor.
 *     tags: [Page Medical Team - Doctor Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the skill to reorder.
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
 *                 description: The new order for the skill.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully reordered the skill.
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
 *                   example: "Skill reordered successfully."
 *       404:
 *         description: Skill not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  '/doctors/skills/:id/reorder',
  verifyAccessToken,
  PageMedicalTeamController.reorderDoctorSkill
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     description: Remove a skill from a specific doctor.
 *     tags: [Page Medical Team - Doctor Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the skill to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the skill.
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
 *                   example: "Skill deleted successfully."
 *       404:
 *         description: Skill not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/doctors/skills/:id', verifyAccessToken, PageMedicalTeamController.deleteDoctorSkill)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{doctorId}/schools:
 *   post:
 *     summary: Create a new school for a doctor
 *     description: Add a new school to a specific doctor in the Page Medical Team.
 *     tags: [Page Medical Team - Doctor Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully created the school.
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
 *                   example: "School created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorSchool'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post(
  '/doctors/:doctorId/schools',
  verifyAccessToken,
  PageMedicalTeamController.createDoctorSchool
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/schools/{id}:
 *   put:
 *     summary: Update a school
 *     description: Update the details of an existing school for a doctor.
 *     tags: [Page Medical Team - Doctor Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school to update.
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
 *                 description: School name in Thai.
 *                 example: "มหาวิทยาลัยเชียงใหม่"
 *               text_en:
 *                 type: string
 *                 description: School name in English.
 *                 example: "Chiang Mai University"
 *     responses:
 *       200:
 *         description: Successfully updated the school.
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
 *                   example: "School updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorSchool'
 *       404:
 *         description: School not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/doctors/schools/:id', verifyAccessToken, PageMedicalTeamController.updateDoctorSchool)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/schools/{id}/reorder:
 *   put:
 *     summary: Reorder a school
 *     description: Update the order of a school in the list for a specific doctor.
 *     tags: [Page Medical Team - Doctor Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school to reorder.
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
 *                 description: The new order for the school.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully reordered the school.
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
 *                   example: "School reordered successfully."
 *       404:
 *         description: School not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  '/doctors/schools/:id/reorder',
  verifyAccessToken,
  PageMedicalTeamController.reorderDoctorSchool
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/schools/{id}:
 *   delete:
 *     summary: Delete a school
 *     description: Remove a school from a specific doctor.
 *     tags: [Page Medical Team - Doctor Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the school.
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
 *                   example: "School deleted successfully."
 *       404:
 *         description: School not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete(
  '/doctors/schools/:id',
  verifyAccessToken,
  PageMedicalTeamController.deleteDoctorSchool
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{doctorId}/certificates:
 *   post:
 *     summary: Create a new certificate for a doctor
 *     description: Add a new certificate to a specific doctor in the Page Medical Team.
 *     tags: [Page Medical Team - Doctor Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully created the certificate.
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
 *                   example: "Certificate created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorCertificate'
 *       400:
 *         description: Invalid input or missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
router.post(
  '/doctors/:doctorId/certificates',
  verifyAccessToken,
  PageMedicalTeamController.createDoctorCertificate
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/certificates/{id}:
 *   put:
 *     summary: Update a certificate
 *     description: Update the details of an existing certificate for a doctor.
 *     tags: [Page Medical Team - Doctor Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to update.
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
 *                 description: Certificate description in Thai.
 *                 example: "ใบประกาศนียบัตรความสามารถพิเศษ"
 *               text_en:
 *                 type: string
 *                 description: Certificate description in English.
 *                 example: "Special Skill Certificate"
 *     responses:
 *       200:
 *         description: Successfully updated the certificate.
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
 *                   example: "Certificate updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/DoctorCertificate'
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  '/doctors/certificates/:id',
  verifyAccessToken,
  PageMedicalTeamController.updateDoctorCertificate
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{doctorId}/certificates/{id}/reorder:
 *   put:
 *     summary: Reorder a certificate
 *     description: Update the order of a certificate in the list for a specific doctor.
 *     tags: [Page Medical Team - Doctor Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to reorder.
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
 *                 description: The new order for the certificate.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully reordered the certificate.
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
 *                   example: "Certificate reordered successfully."
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  '/doctors/certificates/:id/reorder',
  verifyAccessToken,
  PageMedicalTeamController.reorderDoctorCertificate
)

/**
 * @swagger
 * /api/v1/page-medical-team/doctors/{doctorId}/certificates/{id}:
 *   delete:
 *     summary: Delete a certificate
 *     description: Remove a certificate from a specific doctor.
 *     tags: [Page Medical Team - Doctor Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor.
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the certificate to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the certificate.
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
 *                   example: "Certificate deleted successfully."
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete(
  '/doctors/certificates/:id',
  verifyAccessToken,
  PageMedicalTeamController.deleteDoctorCertificate
)

module.exports = router
