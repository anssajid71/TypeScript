import BookingModel, { IBooking } from '../models/booking';

const createBooking = async (bookingData: IBooking) => {
  try {
    const newBooking = await BookingModel.create(bookingData);
    return newBooking;
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (bookingId: string, bookingData: IBooking) => {
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, bookingData, { new: true });

    if (!updatedBooking) {
      throw new Error('Booking not found or no updates were made.');
    }

    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

const getAllBookings = async () => {
  try {
    const bookings = await BookingModel.find();
    return bookings;
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (bookingId: string) => {
  try {
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found.');
    }
    return booking;
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (bookingId: string) => {
  try {
    const result = await BookingModel.findByIdAndRemove(bookingId);

    if (!result) {
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
