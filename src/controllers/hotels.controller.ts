import { Request, Response } from 'express';
import { Hotel } from '../models/hotels';
import { validationResult } from 'express-validator';

let hotels: Hotel[] = [];

export const createHotel = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newHotel: Hotel = {
    id: hotels.length + 1,
    hotel_name: req.body.hotel_name,
    location: req.body.location,
    images: req.body.images,
    description: req.body.description,
    price: req.body.price,
  };

  hotels.push(newHotel);
  res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
};

export const getAllHotels = (req: Request, res: Response) => {
  res.json({ message: 'All hotels retrieved successfully', hotels });
};

export const getHotelById = (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  const hotel = hotels.find((h) => h.id === hotelId);

  if (hotel) {
    res.json({ message: 'Hotel retrieved successfully', hotel });
  } else {
    res.status(404).json({ error: 'Hotel not found' });
  }
};

export const updateHotel = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const hotelId = parseInt(req.params.id);
  const hotel = hotels.find((h) => h.id === hotelId);

  if (hotel) {
    hotel.hotel_name = req.body.hotel_name;
    hotel.location = req.body.location;
    hotel.images = req.body.images;
    hotel.description = req.body.description;
    hotel.price = req.body.price;

    res.json({ message: 'Hotel updated successfully', hotel });
  } else {
    res.status(404).json({ error: 'Hotel not found' });
  }
};

export const deleteHotel = (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  const index = hotels.findIndex((h) => h.id === hotelId);

  if (index !== -1) {
    hotels.splice(index, 1);
    return res.status(204).json({ message: 'Hotel deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Hotel not found' });
  };
}