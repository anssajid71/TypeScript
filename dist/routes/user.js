"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [];
// Create a new user (Create operation)
router.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        role: req.body.role,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
// Retrieve all users (Read operation)
router.get('/users', (req, res) => {
    res.json(users);
});
// Retrieve a specific user by ID (Read operation)
router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
// Update a specific user by ID (Update operation)
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;
        user.password = req.body.password;
        user.role = req.body.role;
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
// Delete a specific user by ID (Delete operation)
router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
exports.default = router;
