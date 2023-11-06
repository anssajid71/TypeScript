import { Request, Response } from 'express';
import HotelModel, { HotelDocument } from '../models/hotels';
import { generateToken } from '../middlewares/generatetoken';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { hotel_name, location, images, description, price } = req.body;

    const existingHotel = await HotelModel.findOne({ hotel_name });

    if (existingHotel) {
      return res.status(400).json({ error: 'This Hotel is already full' });
    }

    const newHotel = new HotelModel({
      hotel_name,
      location,
      images,
      description,
      price,
    });

    const expiresIn = '1m';
    const token = generateToken({ hotel: newHotel }, expiresIn);
    await newHotel.save();

    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel, expiresIn, token });
  } catch (error) {
    console.error('Error creating the hotel:', error);
    res.status(500).json({ error: 'An error occurred while creating the hotel' });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find();
    res.json({ message: 'All hotels retrieved successfully', hotels });
  } catch (error) {
    console.error('Error retrieving hotels:', error);
    res.status(500).json({ error: 'An error occurred while retrieving hotels' });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);
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
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);

    if (hotel) {
      hotel.hotel_name = req.body.hotel_name;
      hotel.location = req.body.location;
      hotel.images = req.body.images;
      hotel.description = req.body.description;
      hotel.price = req.body.price;

      const expiresIn = '1m';
      const token = generateToken({ hotel }, expiresIn);

      await hotel.save();

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
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);

    if (hotel) {
      await hotel.deleteOne();
      res.status(204).json({ message: 'Hotel deleted successfully' });
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error deleting the hotel:', error);
    res.status(500).json({ error: 'An error occurred while deleting the hotel' });
  }
};
