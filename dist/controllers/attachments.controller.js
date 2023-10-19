"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttachment = exports.updateAttachment = exports.getAttachmentById = exports.getAllAttachments = exports.createAttachment = void 0;
const generatetoken_1 = require("../config/generatetoken");
let attachments = [];
const createAttachment = (req, res) => {
    const newAttachment = {
        id: attachments.length + 1,
        attachment_id: req.body.attachment_id,
        attachment_type: req.body.attachment_type,
        attachment_url: req.body.attachment_url,
        created_at: new Date(),
        updated_at: new Date(),
    };
    attachments.push(newAttachment);
    const expiresIn = '1m';
    const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
    res.status(201).json({ message: 'Attachment created successfully', attachment: newAttachment, token });
};
exports.createAttachment = createAttachment;
const getAllAttachments = (req, res) => {
    res.json({ message: 'All attachments retrieved successfully', attachments });
};
exports.getAllAttachments = getAllAttachments;
const getAttachmentById = (req, res) => {
    const attachmentId = parseInt(req.params.id);
    const attachment = attachments.find((a) => a.id === attachmentId);
    if (attachment) {
        res.json({ message: 'Attachment retrieved successfully', attachment });
    }
    else {
        res.status(404).json({ error: 'Attachment not found' });
    }
};
exports.getAttachmentById = getAttachmentById;
const updateAttachment = (req, res) => {
    const attachmentId = parseInt(req.params.id);
    const attachment = attachments.find((a) => a.id === attachmentId);
    if (attachment) {
        attachment.attachment_id = req.body.attachment_id;
        attachment.attachment_type = req.body.attachment_type;
        attachment.attachment_url = req.body.attachment_url;
        attachment.updated_at = new Date();
        res.json({ message: 'Attachment updated successfully', attachment });
    }
    else {
        res.status(404).json({ error: 'Attachment not found' });
    }
};
exports.updateAttachment = updateAttachment;
const deleteAttachment = (req, res) => {
    const attachmentId = parseInt(req.params.id);
    const index = attachments.findIndex((a) => a.id === attachmentId);
    if (index !== -1) {
        attachments.splice(index, 1);
        return res.status(204).json({ message: 'Attachment deleted successfully' });
    }
    else {
        return res.status(404).json({ error: 'Attachment not found' });
    }
};
exports.deleteAttachment = deleteAttachment;
