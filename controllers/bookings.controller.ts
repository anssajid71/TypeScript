import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';
import Booking from '../models/booking';

interface BookingData {
  id: number;
  user_id: number;
  package_id: number;
  date: Date;
  type: string;
  total_number_of_persons: number;
  pickup_location: string;
  total_cost: number;
  status: string;
  payment_method: string;
  payment_status: string;
  payment_date: Date;
}

export const createBooking = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingBooking = await Booking.findOne({ where: { user_id: req.body.user_id } });

    if (existingBooking) {
      return res.status(400).json({ error: 'Booking with the same user_id already exists' });
    }

    const newBooking = await Booking.create(req.body);

    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking, expiresIn, token });
  } catch (error) {
    console.error('Error creating the booking:', error);
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    res.json({ message: 'All bookings retrieved successfully', bookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id, 10);

  try {
    const booking = await Booking.findByPk(bookingId);

    if (booking) {
      res.json({ message: 'Booking retrieved successfully', booking });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error retrieving booking by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the booking' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const bookingId = parseInt(req.params.id, 10);

  try {
    const existingBooking = await Booking.findByPk(bookingId);

    if (existingBooking) {
      await existingBooking.update(req.body);
      res.json({ message: 'Booking updated successfully', booking: existingBooking });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error updating the booking:', error);
    res.status(500).json({ error: 'An error occurred while updating the booking' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id, 10);

  try {
    const existingBooking = await Booking.findByPk(bookingId);

    if (existingBooking) {
      await existingBooking.destroy();
      res.status(204).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error deleting the booking:', error);
    res.status(500).json({ error: 'An error occurred while deleting the booking' });
  }
};
