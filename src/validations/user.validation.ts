
import { body } from 'express-validator';



export const userValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phone_number').optional().isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().isIn(['admin', 'user']).withMessage('Invalid role'),
  ];