import { body } from 'express-validator';

export const attachmentValidationRules = [
  body('attachment_id').isNumeric().withMessage('Attachment ID must be a number'),
  body('attachment_type').notEmpty().withMessage('Attachment type is required'),
  body('attachment_url').notEmpty().withMessage('Attachment URL is required'),
  body('created_at').notEmpty().withMessage('Created date is required'),
  body('updated_at').notEmpty().withMessage('Updated date is required'),
];
