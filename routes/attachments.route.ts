import { Router } from 'express';
import { attachmentValidationRules } from '../validations/attachments.validation';
import * as attachmentController from '../controllers/attachments.controller';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Attachment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       attachment_id:
 *         type: integer
 *       attachment_type:
 *         type: string
 *       attachment_url:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */

/**
 * @swagger
 * /create:
 *   post:
 *     tags:
 *       - Attachments
 *     summary: Create a new attachment
 *     description: Creates a new attachment.
 *     parameters:
 *       - name: Attachment
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Attachment'
 *     responses:
 *       201:
 *         description: Attachment created successfully.
 *         schema:
 *           $ref: '#/definitions/Attachment'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */

router.post('/create', attachmentValidationRules, attachmentController.createAttachment);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - Attachments
 *     summary: Get a list of attachments
 *     description: Returns a list of attachments.
 *     responses:
 *       200:
 *         description: A list of attachments.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Attachment'
 * *     security:
 *       - JWT: []
 */
router.get('/getall', attachmentController.getAllAttachments);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Attachments
 *     summary: Get an attachment by ID
 *     description: Returns an attachment by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Attachment ID.
 *     responses:
 *       200:
 *         description: Attachment found successfully.
 *         schema:
 *           $ref: '#/definitions/Attachment'
 *       404:
 *         description: Attachment not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.get('/:id', attachmentController.getAttachmentById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Attachments
 *     summary: Update an attachment by ID
 *     description: Updates an attachment by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Attachment ID.
 *       - name: Attachment
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Attachment'
 *     responses:
 *       200:
 *         description: Attachment updated successfully.
 *         schema:
 *           $ref: '#/definitions/Attachment'
 *       404:
 *         description: Attachment not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.put('/:id', attachmentValidationRules, attachmentController.updateAttachment);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Attachments
 *     summary: Delete an attachment by ID
 *     description: Deletes an attachment by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Attachment ID.
 *     responses:
 *       200:
 *         description: Attachment deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Attachment not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.delete('/:id', attachmentController.deleteAttachment);

export default router;