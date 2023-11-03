import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user_id: number;
  package_id: number;
  date: Date;
  type: 'flight' | 'hotel' | 'car_rental';
  total_number_of_persons: number;
  pickup_location: string;
  total_cost: number;
  status: 'pending' | 'confirmed' | 'canceled';
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_date?: Date;
}

const BookingSchema: Schema<IBooking> = new Schema({
  user_id: { type: Number, required: true },
  package_id: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['flight', 'hotel', 'car_rental'], required: true },
  total_number_of_persons: { type: Number, required: true },
  pickup_location: { type: String, required: true },
  total_cost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  payment_date: { type: Date },
});

const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
