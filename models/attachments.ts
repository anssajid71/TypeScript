import mongoose, { Document, Schema } from 'mongoose';

export interface IAttachment extends Document {
  attachment_id: number;
  attachment_type: string;
  attachment_url: string;
  created_at: string;
  updated_at: string;
}

const AttachmentSchema: Schema<IAttachment> = new Schema({
  attachment_id: { type: Number, required: true },
  attachment_type: { type: String, required: true },
  attachment_url: { type: String, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
});

const AttachmentModel = mongoose.model<IAttachment>('Attachment', AttachmentSchema);

export default AttachmentModel;
