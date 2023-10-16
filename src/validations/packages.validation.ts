import { body } from 'express-validator';

export const createPackageValidationRules = [
  body('price').isNumeric().withMessage('Price must be a number'),
  body('start_date').isISO8601().withMessage('Invalid date format for start date'),
  body('end_date').isISO8601().withMessage('Invalid date format for end date'),
  body('total_days').isInt().withMessage('Total days must be an integer'),
  body('type').isString().notEmpty().withMessage('Type is required'),
  body('images').isString().notEmpty().withMessage('Images are required'),
  body('available_seats').isInt().withMessage('Available seats must be an integer'),
  body('location').isString().notEmpty().withMessage('Location is required'),
  body('created_at').isISO8601().withMessage('Invalid date format for created_at'),
  body('updated_at').isISO8601().withMessage('Invalid date format for updated_at'),
];
