"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.signInUser = void 0;
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
let users = [];
const signInUser = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userEmail = req.body.email;
    const user = users.find((u) => u.email === userEmail);
    if (!user) {
        return res.status(401).json({ error: 'Invalid Email address' });
    }
    if (user.password !== req.body.password) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const expiresIn = '1m';
    const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
    return res.status(200).json({ message: 'User signed in successfully', user, token });
};
exports.signInUser = signInUser;
const createUser = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email,
        phone_number: req.body.phone_number,
        password,
        role,
    };
    users.push(newUser);
    const expiresIn = '1m';
    const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
    res.status(201).json({ message: 'User Signup successfully', user: newUser, token });
};
exports.createUser = createUser;
const getAllUsers = (req, res) => {
    res.json({ message: 'All users retrieved successfully', users });
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json({ message: 'User retrieved successfully', user });
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.getUserById = getUserById;
const updateUser = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;
        user.password = req.body.password;
        user.role = req.body.role;
        res.json({ message: 'User updated successfully', user });
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        return res.status(204).json({ message: 'User deleted successfully' });
    }
    else {
        return res.status(404).json({ error: 'User not found' });
    }
};
exports.deleteUser = deleteUser;
