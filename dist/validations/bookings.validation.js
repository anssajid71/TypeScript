"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.bookingValidationRules = [
    (0, express_validator_1.body)('user_id').isNumeric().withMessage('User ID must be a number'),
    (0, express_validator_1.body)('package_id').isNumeric().withMessage('Package ID must be a number'),
    (0, express_validator_1.body)('date').isISO8601().withMessage('Invalid date format'),
    (0, express_validator_1.body)('type').isIn(['flight', 'hotel', 'car_rental']).withMessage('Invalid booking type'),
    (0, express_validator_1.body)('total_number_of_persons').isNumeric().withMessage('Total number of persons must be a number'),
    (0, express_validator_1.body)('pickup_location').notEmpty().withMessage('Pickup location is required'),
    (0, express_validator_1.body)('total_cost').isNumeric().withMessage('Total cost must be a number'),
    (0, express_validator_1.body)('status').isIn(['pending', 'confirmed', 'canceled']).withMessage('Invalid booking status'),
    (0, express_validator_1.body)('payment_method').notEmpty().withMessage('Payment method is required'),
    (0, express_validator_1.body)('payment_status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid payment status'),
    (0, express_validator_1.body)('payment_date').isISO8601().withMessage('Invalid payment date format'),
    (0, express_validator_1.body)('created_at').isISO8601().withMessage('Invalid created date format'),
    (0, express_validator_1.body)('updated_at').isISO8601().withMessage('Invalid updated date format'),
];
