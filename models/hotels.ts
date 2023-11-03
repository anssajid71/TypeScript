import mongoose, { Document, Schema } from 'mongoose';

// Define the schema for the "hotels" collection
const hotelSchema = new Schema({
  hotel_name: {
    type: String,
    required: true,
    unique: true,
  },
  location: String,
  images: String,
  description: String,
  price: Number,
});

// Create a Mongoose model for the "hotels" collection
const HotelModel = mongoose.model<HotelDocument>('Hotel', hotelSchema);

export interface HotelDocument extends Document {
  hotel_name: string;
  location?: string;
  images?: string;
  description?: string;
  price?: number;
}

export default HotelModel;
