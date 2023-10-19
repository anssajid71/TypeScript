"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.companyValidationRules = [
    (0, express_validator_1.body)('user_id').isNumeric().withMessage('User ID must be a number'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('logo').notEmpty().withMessage('Logo is required'),
    (0, express_validator_1.body)('phone_number').notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('payment_status').notEmpty().withMessage('Payment status is required'),
];
