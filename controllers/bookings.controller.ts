import { Request, Response } from 'express';
import BookingModel, { IBooking } from '../models/booking';
import { generateToken } from '../middlewares/generatetoken';


export const createBooking = async (req: Request, res: Response) => {
  const bookingData: IBooking = req.body;

  try {
    const existingBooking = await BookingModel.findOne({ user_id: bookingData.user_id });

    if (existingBooking) {
      return res.status(400).json({ error: 'Booking with the same user_id already exists' });
    }

    const newBooking = await BookingModel.create(bookingData);

    const expiresIn = '1m';
    const token = generateToken({ booking: newBooking }, expiresIn);

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking, expiresIn, token });
  } catch (error) {
    console.error('Error creating the booking:', error);
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find();
    res.json({ message: 'All bookings retrieved successfully', bookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  const bookingId = req.params.id;

  try {
    const booking = await BookingModel.findById(bookingId);

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
  const bookingId = req.params.id;
  const bookingData: IBooking = req.body;

  try {
    const existingBooking = await BookingModel.findById(bookingId);

    if (existingBooking) {
      existingBooking.set(bookingData);
      await existingBooking.save();
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
  const bookingId = req.params.id;

  try {
    const existingBooking = await BookingModel.findById(bookingId);

    if (existingBooking) {
      await existingBooking.deleteOne();
      res.status(204).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error deleting the booking:', error);
    res.status(500).json({ error: 'An error occurred while deleting the booking' });
  }
};
