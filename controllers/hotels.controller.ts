import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';
import Hotel from '../models/hotels';

export const createHotel = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { hotel_name, location, images, description, price } = req.body;
    const existingHotel = await Hotel.findOne({ where: { hotel_name } });

    if (existingHotel) {
      return res.status(400).json({ error: 'This Hotel is already full' });
    }
    const newHotel = await Hotel.create({
      id: req.body.id,
      hotel_name,
      location,
      images,
      description,
      price,
    });

    const expiresIn = '1m';
    const token = generateToken({ data: { hotel: newHotel }, expiresIn });

    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel, expiresIn, token });
  } catch (error) {
    console.error('Error creating the hotel:', error);
    res.status(500).json({ error: 'An error occurred while creating the hotel' });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.findAll();
    res.json({ message: 'All hotels retrieved successfully', hotels });
  } catch (error) {
    console.error('Error retrieving hotels:', error);
    res.status(500).json({ error: 'An error occurred while retrieving hotels' });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id, 10);
  try {
    const hotel = await Hotel.findByPk(hotelId);
    if (hotel) {
      res.json({ message: 'Hotel retrieved successfully', hotel });
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error retrieving hotel by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the hotel' });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id, 10);
  try {
    const hotel = await Hotel.findByPk(hotelId);

    if (hotel) {
      hotel.hotel_name = req.body.hotel_name;
      hotel.location = req.body.location;
      hotel.images = req.body.images;
      hotel.description = req.body.description;
      hotel.price = req.body.price;

      await hotel.save();

      const expiresIn = '1m';
      const token = generateToken({ data: { hotel }, expiresIn });

      return res.status(200).json({
        message: 'Hotel updated successfully',
        hotel,
        token,
        expiresIn,
      });
    } else {
      return res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error updating the hotel:', error);
    return res.status(500).json({ error: 'An error occurred while updating the hotel' });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id, 10);
  try {
    const hotel = await Hotel.findByPk(hotelId);

    if (hotel) {
      await hotel.destroy();
      res.status(204).json({ message: 'Hotel deleted successfully' });
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error deleting the hotel:', error);
    res.status(500).json({ error: 'An error occurred while deleting the hotel' });
  }
};
