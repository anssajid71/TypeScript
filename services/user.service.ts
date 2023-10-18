import User  from '../models/user';
import bcrypt from 'bcrypt';
// import { generateToken } from '../config/generatetoken';

const createUser = async (userData: any) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: number, userData: any) => {
  try {
    const [rowsUpdated] = await User.update(userData, {
      where: { id: userId },
    });

    if (rowsUpdated === 0) {
      throw new Error('User not found or no updates were made.');
    }

    const updatedUser = await User.findByPk(userId);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const rowsDeleted = await User.destroy({
      where: { id: userId },
    });

    if (rowsDeleted === 0) {
      throw new Error('User not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ where: { email } });
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
