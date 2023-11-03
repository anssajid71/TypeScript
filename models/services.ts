import mongoose, { Document, Schema } from 'mongoose';

interface ServicesAttributes {
  package_id: number;
  service_name: string;
}

export interface ServicesDocument extends ServicesAttributes, Document {}

const servicesSchema = new Schema<ServicesDocument>({
  package_id: { type: Number, required: true },
  service_name: { type: String, required: true },
});

const ServicesModel = mongoose.model<ServicesDocument>('Services', servicesSchema);

export default ServicesModel;
