import Booking  from '../models/booking';

// Function to create a new booking
const createBooking = async (bookingData: any) => {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking;
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (bookingId: number, bookingData: any) => {
  try {
    const [rowsUpdated] = await Booking.update(bookingData, {
      where: { id: bookingId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Booking not found or no updates were made.');
    }

    const updatedBooking = await Booking.findByPk(bookingId);
    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

// Function to get all bookings
const getAllBookings = async () => {
  try {
    const bookings = await Booking.findAll();
    return bookings;
  } catch (error) {
    throw error;
  }
};

// Function to get a booking by ID
const getBookingById = async (bookingId: number) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    return booking;
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (bookingId: number) => {
  try {
    const rowsDeleted = await Booking.destroy({
      where: { id: bookingId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Booking not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

export {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
};
