import { body } from 'express-validator';


export const serviceValidationRules = [
    body('package_id').isNumeric().withMessage('Package ID must be a number'),
    body('service_name').notEmpty().withMessage('Service name is required'),
  ];