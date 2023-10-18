import { Request, Response } from 'express';

interface Attachment {
  id: number;
  attachment_id: number;
  attachment_type: string;
  attachment_url: string;
  created_at: Date;
  updated_at: Date;
}

let attachments: Attachment[] = [];

export const createAttachment = (req: Request, res: Response) => {
  const newAttachment: Attachment = {
    id: attachments.length + 1,
    attachment_id: req.body.attachment_id,
    attachment_type: req.body.attachment_type,
    attachment_url: req.body.attachment_url,
    created_at: new Date(),
    updated_at: new Date(),
  };

  attachments.push(newAttachment);
  res.status(201).json({ message: 'Attachment created successfully', attachment: newAttachment });
};

export const getAllAttachments = (req: Request, res: Response) => {
  res.json({ message: 'All attachments retrieved successfully', attachments });
};

export const getAttachmentById = (req: Request, res: Response) => {
  const attachmentId = parseInt(req.params.id);
  const attachment = attachments.find((a) => a.id === attachmentId);

  if (attachment) {
    res.json({ message: 'Attachment retrieved successfully', attachment });
  } else {
    res.status(404).json({ error: 'Attachment not found' });
  }
};

export const updateAttachment = (req: Request, res: Response) => {
  const attachmentId = parseInt(req.params.id);
  const attachment = attachments.find((a) => a.id === attachmentId);

  if (attachment) {
    attachment.attachment_id = req.body.attachment_id;
    attachment.attachment_type = req.body.attachment_type;
    attachment.attachment_url = req.body.attachment_url;
    attachment.updated_at = new Date();

    res.json({ message: 'Attachment updated successfully', attachment });
  } else {
    res.status(404).json({ error: 'Attachment not found' });
  }
};

export const deleteAttachment = (req: Request, res: Response) => {
  const attachmentId = parseInt(req.params.id);
  const index = attachments.findIndex((a) => a.id === attachmentId);

  if (index !== -1) {
    attachments.splice(index, 1);
    return res.status(204).json({ message: 'Attachment deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Attachment not found' });
  }
};
