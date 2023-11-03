import HotelModel, { HotelDocument } from '../models/hotels';

const createHotel = async (hotelData: any) => {
  try {
    const newHotel = new HotelModel(hotelData);
    await newHotel.save();
    return newHotel;
  } catch (error) {
    throw error;
  }
};

const updateHotel = async (hotelId: string, hotelData: any) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(hotelId, hotelData, { new: true });
    
    if (!updatedHotel) {
      throw new Error('Hotel not found or no updates were made.');
    }
    
    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

const getAllHotels = async () => {
  try {
    const hotels = await HotelModel.find();
    return hotels;
  } catch (error) {
    throw error;
  }
};

const getHotelById = async (hotelId: string) => {
  try {
    const hotel = await HotelModel.findById(hotelId);
    
    if (!hotel) {
      throw new Error('Hotel not found.');
    }
    
    return hotel;
  } catch (error) {
    throw error;
  }
};

const deleteHotel = async (hotelId: string) => {
  try {
    const deletedHotel = await HotelModel.findByIdAndRemove(hotelId);
    
    if (!deletedHotel) {
      throw new Error('Hotel not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

export {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
};
