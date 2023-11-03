import mongoose, { Document, Schema } from 'mongoose';

interface UserAttributes {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

export interface UserDocument extends UserAttributes, Document {}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
