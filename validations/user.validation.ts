import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import User  from '../models/user';

const validateSignUpRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Valid Email required')
    .custom(async (value: string) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
];

const validateSignInRequest = [
  check('email').isEmail().withMessage('Valid Email required'),
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
];

const isRequestValidated = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: errors.array()[0].msg });
  }
  next();
};

export {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
};
