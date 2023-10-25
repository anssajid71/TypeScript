import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Hostel from '../models/hotels'; // Import the Hostel Sequelize model
import { generateToken } from '../config/generatetoken';

export const createHostel = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Create a hostel in the database using Sequelize
    const newHostel = await Hostel.create({
      id: req.body.id, // Include an "id" field if necessary
      hotel_name: req.body.hotel_name,
      location: req.body.location,
      images: req.body.images || null,
      description: req.body.description || null,
      price: req.body.price || null,
    });

    // You can perform additional tasks here, e.g., generate a token or perform other operations.

    res.status(201).json({ message: 'Hostel created successfully', hostel: newHostel });
  } catch (error) {
    console.error('Error creating the hostel:', error);
    res.status(500).json({ error: 'An error occurred while creating the hostel' });
  }
};

export const getAllHostels = async (req: Request, res: Response) => {
  try {
    const hostels = await Hostel.findAll();
    res.json({ message: 'All hostels retrieved successfully', hostels });
  } catch (error) {
    console.error('Error retrieving hostels:', error);
    res.status(500).json({ error: 'An error occurred while retrieving hostels' });
  }
};

export const getHostelById = async (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  try {
    const hostel = await Hostel.findByPk(hostelId);

    if (hostel) {
      res.json({ message: 'Hostel retrieved successfully', hostel });
    } else {
      res.status(404).json({ error: 'Hostel not found' });
    }
  } catch (error) {
    console.error('Error retrieving hostel by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the hostel' });
  }
};

export const updateHostel = async (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  try {
    const hostel = await Hostel.findByPk(hostelId);

    if (hostel) {
      hostel.hotel_name = req.body.hotel_name;
      hostel.location = req.body.location;
      hostel.images = req.body.images || null;
      hostel.description = req.body.description || null;
      hostel.price = req.body.price || null;
      
      await hostel.save(); // Save the changes to the database
      
      res.json({ message: 'Hostel updated successfully', hostel });
    } else {
      res.status(404).json({ error: 'Hostel not found' });
    }
  } catch (error) {
    console.error('Error updating hostel:', error);
    res.status(500).json({ error: 'An error occurred while updating the hostel' });
  }
};

export const deleteHostel = async (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  try {
    const hostel = await Hostel.findByPk(hostelId);

    if (hostel) {
      await hostel.destroy();
      res.status(204).json({ message: 'Hostel deleted successfully' });
    } else {
      res.status(404).json({ error: 'Hostel not found' });
    }
  } catch (error) {
    console.error('Error deleting hostel:', error);
    res.status(500).json({ error: 'An error occurred while deleting the hostel' });
  }
};
