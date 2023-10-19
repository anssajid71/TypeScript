"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.attachmentValidationRules = [
    (0, express_validator_1.body)('attachment_id').isNumeric().withMessage('Attachment ID must be a number'),
    (0, express_validator_1.body)('attachment_type').notEmpty().withMessage('Attachment type is required'),
    (0, express_validator_1.body)('attachment_url').notEmpty().withMessage('Attachment URL is required'),
    (0, express_validator_1.body)('created_at').notEmpty().withMessage('Created date is required'),
    (0, express_validator_1.body)('updated_at').notEmpty().withMessage('Updated date is required'),
];
