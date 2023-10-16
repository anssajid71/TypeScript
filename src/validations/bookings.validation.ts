import { body } from 'express-validator';

export const bookingValidationRules = [
  body('user_id').isNumeric().withMessage('User ID must be a number'),
  body('package_id').isNumeric().withMessage('Package ID must be a number'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('type').isIn(['flight', 'hotel', 'car_rental']).withMessage('Invalid booking type'),
  body('total_number_of_persons').isNumeric().withMessage('Total number of persons must be a number'),
  body('pickup_location').notEmpty().withMessage('Pickup location is required'),
  body('total_cost').isNumeric().withMessage('Total cost must be a number'),
  body('status').isIn(['pending', 'confirmed', 'canceled']).withMessage('Invalid booking status'),
  body('payment_method').notEmpty().withMessage('Payment method is required'),
  body('payment_status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid payment status'),
  body('payment_date').isISO8601().withMessage('Invalid payment date format'),
  body('created_at').isISO8601().withMessage('Invalid created date format'),
  body('updated_at').isISO8601().withMessage('Invalid updated date format'),
];
