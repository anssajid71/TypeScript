import { body } from 'express-validator';

export const hotelValidationRules = [
  body('hotel_name').notEmpty().withMessage('Hotel name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('images').notEmpty().withMessage('Images are required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];
