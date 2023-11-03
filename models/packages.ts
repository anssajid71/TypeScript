import mongoose, { Document, Schema } from 'mongoose';

interface PackageAttributes {
  name: string;
  email: string;
  price: number;
  start_date: Date;
  end_date: Date;
  total_days: number;
  type: string;
  images: string;
  available_seats: number;
  location: string;
}

export interface PackageDocument extends PackageAttributes, Document {}

const packageSchema = new Schema<PackageDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  total_days: { type: Number, required: true },
  type: { type: String, required: true },
  images: { type: String, required: true },
  available_seats: { type: Number, required: true },
  location: { type: String, required: true },
});

const PackageModel = mongoose.model<PackageDocument>('Package', packageSchema);

export default PackageModel;
