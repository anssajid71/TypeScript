import UserModel, { UserDocument } from '../models/user';
import bcrypt from 'bcrypt';

const createUser = async (userData: UserDocument) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: string, userData: UserDocument) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true });

    if (!updatedUser) {
      throw new Error('User not found or no updates were made.');
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error('User not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
  findUserByEmail,
};
