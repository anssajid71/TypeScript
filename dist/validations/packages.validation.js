"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackageValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.createPackageValidationRules = [
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('start_date').isISO8601().withMessage('Invalid date format for start date'),
    (0, express_validator_1.body)('end_date').isISO8601().withMessage('Invalid date format for end date'),
    (0, express_validator_1.body)('total_days').isInt().withMessage('Total days must be an integer'),
    (0, express_validator_1.body)('type').isString().notEmpty().withMessage('Type is required'),
    (0, express_validator_1.body)('images').isString().notEmpty().withMessage('Images are required'),
    (0, express_validator_1.body)('available_seats').isInt().withMessage('Available seats must be an integer'),
    (0, express_validator_1.body)('location').isString().notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('created_at').isISO8601().withMessage('Invalid date format for created_at'),
    (0, express_validator_1.body)('updated_at').isISO8601().withMessage('Invalid date format for updated_at'),
];
