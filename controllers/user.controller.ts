import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

let users: UserData[] = [];

export const signInUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userEmail = req.body.email;
  const user = users.find((u) => u.email === userEmail);

  if (!user) {
    return res.status(401).json({ error: 'Invalid Email address' });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  return res.status(200).json({ message: 'User signed in successfully', user });
};

export const createUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser: UserData = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
    role: req.body.role,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User Signup successfully', user: newUser });
};

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ message: 'All users retrieved successfully', users });
};

export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ message: 'User retrieved successfully', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const updateUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.password = req.body.password;
    user.role = req.body.role;

    res.json({ message: 'User updated successfully', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    return res.status(204).json({ message: 'User deleted successfully' });
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
};
