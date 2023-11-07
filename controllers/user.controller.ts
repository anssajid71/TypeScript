import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/user';
import { generateToken } from '../middlewares/generatetoken';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone_number, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone_number,
      password: hashedPassword,
      role,
    });

    const expiresIn = '1m';
    const token = generateToken({ user: newUser }, expiresIn);

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser, expiresIn, token });
  } catch (error) {
    console.error('Error creating the user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  const user = await UserModel.findOne({ email: userEmail });

  if (!user) {
    return res.status(401).json({ error: 'Invalid Email address' });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const expiresIn = '1m';
  const token = generateToken({ user }, expiresIn);

  return res.status(200).json({ message: 'User signed in successfully', user, token });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json({ message: 'All users retrieved successfully', users });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);

  if (user) {
    res.json({ message: 'User retrieved successfully', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone_number = req.body.phone_number;

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;

      user.role = req.body.role;

      await user.save();

      const expiresIn = '1m';
      const token = generateToken({ user }, expiresIn);

      return res.status(200).json({
        message: 'User updated successfully',
        user,
        expiresIn,
        token,
      });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating the user:', error);
    return res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (user) {
      await user.deleteOne();
      return res.status(204).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting the user:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

