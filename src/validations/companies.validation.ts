import { body } from 'express-validator';

export const companyValidationRules = [
  body('user_id').isNumeric().withMessage('User ID must be a number'),
  body('name').notEmpty().withMessage('Name is required'),
  body('logo').notEmpty().withMessage('Logo is required'),
  body('phone_number').notEmpty().withMessage('Phone number is required'),
  body('payment_status').notEmpty().withMessage('Payment status is required'),
];
