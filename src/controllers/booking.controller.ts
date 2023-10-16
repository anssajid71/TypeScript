import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Booking } from '../models/bookings';

let bookings: Booking[] = [];

export const createBooking = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newBooking: Booking = {
    id: bookings.length + 1,
    user_id: req.body.user_id,
    package_id: req.body.package_id,
    date: new Date(req.body.date),
    type: req.body.type,
    total_number_of_persons: req.body.total_number_of_persons,
    pickup_location: req.body.pickup_location,
    total_cost: req.body.total_cost,
    status: req.body.status,
    payment_method: req.body.payment_method,
    payment_status: req.body.payment_status,
    payment_date: req.body.payment_date,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  };

  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
};

export const getAllBookings = (req: Request, res: Response) => {
  res.json({ message: 'All bookings retrieved successfully', bookings });
};

export const getBookingById = (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find((b) => b.id === bookingId);

  if (booking) {
    res.json({ message: 'Booking retrieved successfully', booking });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
};

export const updateBooking = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const bookingId = parseInt(req.params.id);
  const booking = bookings.find((b) => b.id === bookingId);

  if (booking) {
    booking.user_id = req.body.user_id;
    booking.package_id = req.body.package_id;
    booking.date = new Date(req.body.date);
    booking.type = req.body.type;
    booking.total_number_of_persons = req.body.total_number_of_persons;
    booking.pickup_location = req.body.pickup_location;
    booking.total_cost = req.body.total_cost;
    booking.status = req.body.status;
    booking.payment_method = req.body.payment_method;
    booking.payment_status = req.body.payment_status;
    booking.payment_date = req.body.payment_date;
    booking.updated_at = req.body.updated_at;

    res.json({ message: 'Booking updated successfully', booking });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
};

export const deleteBooking = (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === bookingId);

  if (index !== -1) {
    bookings.splice(index, 1);
    return res.status(204).json({ message: 'Booking deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Booking not found' });
  }
};
