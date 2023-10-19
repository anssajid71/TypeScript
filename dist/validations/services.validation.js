"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.serviceValidationRules = [
    (0, express_validator_1.body)('package_id').isNumeric().withMessage('Package ID must be a number'),
    (0, express_validator_1.body)('service_name').notEmpty().withMessage('Service name is required'),
];
