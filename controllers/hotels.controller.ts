import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Hotels from '../models/hotels';
import { generateToken } from '../config/generatetoken';

interface HostelData {
  id: number;
  hotel_name: string;
  location: string;
  images: string | null;
  description: string | null;
  price: number | null;
}

let hostels: HostelData[] = [];
let nextHostelId = 1;

export const createHostel = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newHostel: HostelData = {
      id: nextHostelId++,
      hotel_name: req.body.hotel_name,
      location: req.body.location,
      images: req.body.images || null,
      description: req.body.description || null,
      price: req.body.price || null,
    };

    hostels.push(newHostel);
    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });
    res.status(201).json({ message: 'Hostel created successfully', hostel: newHostel, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the hostel' });
  }
};

export const getAllHostels = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: 'All hostels retrieved successfully', hostels });
};

export const getHostelById = (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  const hostel = hostels.find((h) => h.id === hostelId);

  if (hostel) {
    res.json({ message: 'Hostel retrieved successfully', hostel });
  } else {
    res.status(404).json({ error: 'Hostel not found' });
  }
};

export const updateHostel = (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  const hostel = hostels.find((h) => h.id === hostelId);

  if (hostel) {
    hostel.hotel_name = req.body.hotel_name;
    hostel.location = req.body.location;
    hostel.images = req.body.images || null;
    hostel.description = req.body.description || null;
    hostel.price = req.body.price || null;

    res.json({ message: 'Hostel updated successfully', hostel });
  } else {
    res.status(404).json({ error: 'Hostel not found' });
  }
};

export const deleteHostel = (req: Request, res: Response) => {
  const hostelId = parseInt(req.params.id, 10);
  const index = hostels.findIndex((h) => h.id === hostelId);

  if (index !== -1) {
    hostels.splice(index, 1);
    return res.status(204).json({ message: 'Hostel deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Hostel not found' });
  }
};
