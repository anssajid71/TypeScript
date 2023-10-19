"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestValidated = exports.createUser = exports.handleValidationErrors = exports.validateUserRegistration = void 0;
const express_validator_1 = require("express-validator");
let users = [];
const validateUserRegistration = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (0, express_validator_1.check)('role')
        .isIn(['admin', 'user'])
        .withMessage('Invalid role, must be admin or user'),
];
exports.validateUserRegistration = validateUserRegistration;
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
};
exports.handleValidationErrors = handleValidationErrors;
const createUser = (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role,
    };
    users.push(newUser);
    res.status(201).json({ message: 'User Signup successfully', user: newUser });
};
exports.createUser = createUser;
const isRequestValidated = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.array().length > 0) {
        return res
            .json({ error: errors.array()[0].msg });
    }
    next();
};
exports.isRequestValidated = isRequestValidated;
