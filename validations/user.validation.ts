import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

let users: UserData[] = [];

const validateUserRegistration = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('role')
    .isIn(['admin', 'user'])
    .withMessage('Invalid role, must be admin or user'),
];

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

const createUser = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  const newUser: UserData = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User Signup successfully', user: newUser });
};

export {
  validateUserRegistration,
  handleValidationErrors,
  createUser,
  isRequestValidated
};


const isRequestValidated = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res
      .json({ error: errors.array()[0].msg });
  }
  next();
};


