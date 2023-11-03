import { Request, Response } from 'express';
import AttachmentModel, { IAttachment } from '../models/attachments';

export const createAttachment = async (req: Request, res: Response) => {
  const attachmentData: IAttachment = req.body;

  try {
    const existingAttachment = await AttachmentModel.findOne({ attachment_id: attachmentData.attachment_id });

    if (existingAttachment) {
      return res.status(400).json({ error: 'Attachment with the same attachment_id already exists' });
    }

    const newAttachment = await AttachmentModel.create(attachmentData);

    res.status(201).json({ message: 'Attachment created successfully', Attachments: newAttachment });
  } catch (error) {
    console.error('Error creating the Attachment:', error);
    res.status(500).json({ error: 'An error occurred while creating the Attachment' });
  }
};

export const getAttachmentById = async (req: Request, res: Response) => {
  const attachmentId = req.params.id;

  try {
    const attachment = await AttachmentModel.findById(attachmentId);

    if (attachment) {
      res.json({ message: 'Attachment retrieved successfully', Attachments: attachment });
    } else {
      res.status(404).json({ error: 'Attachment not found' });
    }
  } catch (error) {
    console.error('Error retrieving attachment by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the attachment' });
  }
};

export const updateAttachment = async (req: Request, res: Response) => {
  const attachmentId = req.params.id;
  const attachmentData: IAttachment = req.body;

  try {
    const existingAttachment = await AttachmentModel.findByIdAndUpdate(attachmentId, attachmentData, { new: true });

    if (existingAttachment) {
      res.json({ message: 'Attachment updated successfully', Attachments: existingAttachment });
    } else {
      res.status(404).json({ error: 'Attachment not found' });
    }
  } catch (error) {
    console.error('Error updating the attachment:', error);
    res.status(500).json({ error: 'An error occurred while updating the attachment' });
  }
};

export const deleteAttachment = async (req: Request, res: Response) => {
  const attachmentId = req.params.id;

  try {
    const existingAttachment = await AttachmentModel.findByIdAndRemove(attachmentId);

    if (existingAttachment) {
      res.status(204).json({ message: 'Attachment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Attachment not found' });
    }
  } catch (error) {
    console.error('Error deleting the attachment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the attachment' });
  }
};

export const getAllAttachments = async (req: Request, res: Response) => {
  try {
    const attachments = await AttachmentModel.find();
    res.json({ message: 'All attachments retrieved successfully', Attachments: attachments });
  } catch (error) {
    console.error('Error retrieving attachments:', error);
    res.status(500).json({ error: 'An error occurred while retrieving attachments' });
  }
};
