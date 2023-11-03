import AttachmentModel, { IAttachment } from '../models/attachments';

const createAttachment = async (attachmentData: IAttachment) => {
  try {
    const newAttachment = await AttachmentModel.create(attachmentData);
    return newAttachment;
  } catch (error) {
    throw error;
  }
};

const updateAttachment = async (attachmentId: string, attachmentData: IAttachment) => {
  try {
    const updatedAttachment = await AttachmentModel.findByIdAndUpdate(attachmentId, attachmentData, { new: true });

    if (!updatedAttachment) {
      throw new Error('Attachment not found or no updates were made.');
    }

    return updatedAttachment;
  } catch (error) {
    throw error;
  }
};

const getAllAttachments = async () => {
  try {
    const attachments = await AttachmentModel.find();
    return attachments;
  } catch (error) {
    throw error;
  }
};

const getAttachmentById = async (attachmentId: string) => {
  try {
    const attachment = await AttachmentModel.findById(attachmentId);
    if (!attachment) {
      throw new Error('Attachment not found.');
    }
    return attachment;
  } catch (error) {
    throw error;
  }
};

const deleteAttachment = async (attachmentId: string) => {
  try {
    const result = await AttachmentModel.findByIdAndRemove(attachmentId);

    if (!result) {
      throw new Error('Attachment not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

export {
  createAttachment,
  updateAttachment,
  getAllAttachments,
  getAttachmentById,
  deleteAttachment,
};
