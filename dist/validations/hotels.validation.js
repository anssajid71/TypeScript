"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.hotelValidationRules = [
    (0, express_validator_1.body)('hotel_name').notEmpty().withMessage('Hotel name is required'),
    (0, express_validator_1.body)('location').notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('images').notEmpty().withMessage('Images are required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
];
