import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';

export const validateUserRegistration = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('role')
    .isIn(['admin', 'user'])
    .withMessage('Invalid role, must be admin or user'),
];

export const createUservalidations = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  next();
};

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

export const isRequestValidated = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.json({ error: errors.array()[0].msg });
  }
  next();
};
