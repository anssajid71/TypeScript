import Hotels  from '../models/hotels';

const createHotel = async (hotelData: any) => {
  try {
    const newHotel = await Hotels.create(hotelData);
    return newHotel;
  } catch (error) {
    throw error;
  }
};

const updateHotel = async (userId: number, userData: any) => {
  try {
    const [rowsUpdated] = await Hotels.update(userData, {
      where: { id: userId },
    });

    if (rowsUpdated === 0) {
      throw new Error('User not found or no updates were made.');
    }

    const updatedHotel = await Hotels.findByPk(userId);
    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

const getAllHotels = async () => {
  try {
    const hotels = await Hotels.findAll();
    return hotels;
  } catch (error) {
    throw error;
  }
};

const getHotelById = async (hotelId: number) => {
  try {
    const hotel = await Hotels.findByPk(hotelId);
    return hotel;
  } catch (error) {
    throw error;
  }
};

const deleteHotel = async (hotelId: number) => {
  try {
    const rowsDeleted = await Hotels.destroy({
      where: { id: hotelId },
    });

    if (rowsDeleted === 0) {
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
