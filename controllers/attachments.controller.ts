import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';
import Attachments from '../models/attachments';

interface Attachment {
  id: number;
  attachment_id: number;
  attachment_type: string;
  attachment_url: string;
  created_at: Date;
  updated_at: Date;
}

export const createAttachment = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingAttachment = await Attachments.findOne({ where: { attachment_id: req.body.attachment_id } });

    if (existingAttachment) {
      return res.status(400).json({ error: 'Attachment with the same attachment_id already exists' });
    }

    const newAttachment = await Attachments.create(req.body);

    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(201).json({ message: 'Attachment created successfully', Attachments: newAttachment, expiresIn, token });
  } catch (error) {
    console.error('Error creating the Attachment:', error);
    res.status(500).json({ error: 'An error occurred while creating the Attachment' });
  }
};

export const getAttachmentById = async (req: Request, res: Response) => {
  const attachmentId = parseInt(req.params.id, 10);

  try {
    const attachment = await Attachments.findByPk(attachmentId);

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
  const attachmentId = parseInt(req.params.id, 10);

  try {
    const existingAttachment = await Attachments.findByPk(attachmentId);

    if (existingAttachment) {
      await existingAttachment.update(req.body);
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
  const attachmentId = parseInt(req.params.id, 10);

  try {
    const existingAttachment = await Attachments.findByPk(attachmentId);

    if (existingAttachment) {
      await existingAttachment.destroy();
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
    const attachments = await Attachments.findAll();
    res.json({ message: 'All attachments retrieved successfully', Attachments: attachments });
  } catch (error) {
    console.error('Error retrieving attachments:', error);
    res.status(500).json({ error: 'An error occurred while retrieving attachments' });
  }
};