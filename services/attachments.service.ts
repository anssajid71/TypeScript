import Attachments  from '../models/attachments';

// Function to create a new attachment
const createAttachment = async (attachmentData: any) => {
  try {
    const newAttachment = await Attachments.create(attachmentData);
    return newAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to update an attachment by ID
const updateAttachment = async (attachmentId: number, attachmentData: any) => {
  try {
    const updatedAttachment = await Attachments.findByPk(attachmentId);

    return updatedAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to get all attachments
const getAllAttachments = async () => {
  try {
    const attachments = await Attachments.findAll();
    return attachments;
  } catch (error) {
    throw error;
  }
};

// Function to get an attachment by ID
const getAttachmentById = async (attachmentId: number) => {
  try {
    const attachment = await Attachments.findByPk(attachmentId);
    return attachment;
  } catch (error) {
    throw error;
  }
};


const deleteAttachment = async (attachmentId: number) => {
  try {
    const rowsDeleted = await Attachments.destroy({
      where: {
        id: attachmentId,
      },
    });
    if (rowsDeleted === 0) {
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
