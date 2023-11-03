import { Document, Schema, model, Model } from 'mongoose';

export interface ICompany extends Document {
  user_id: number;
  name: string;
  logo?: string | null;
  phone_number?: string | null;
  payment_status?: string | null;
}

const CompanySchema: Schema<ICompany> = new Schema(
  {
    user_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String },
    phone_number: { type: String },
    payment_status: { type: String },
  },
  { timestamps: true }
);

const Company: Model<ICompany> = model('Company', CompanySchema);

export default Company;
