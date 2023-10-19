"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHostel = exports.updateHostel = exports.getHostelById = exports.getAllHostels = exports.createHostel = void 0;
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
let hostels = [];
let nextHostelId = 1;
const createHostel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newHostel = {
            id: nextHostelId++,
            hotel_name: req.body.hotel_name,
            location: req.body.location,
            images: req.body.images || null,
            description: req.body.description || null,
            price: req.body.price || null,
        };
        hostels.push(newHostel);
        const expiresIn = '1m';
        const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
        res.status(201).json({ message: 'Hostel created successfully', hostel: newHostel, token });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the hostel' });
    }
});
exports.createHostel = createHostel;
const getAllHostels = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'All hostels retrieved successfully', hostels });
};
exports.getAllHostels = getAllHostels;
const getHostelById = (req, res) => {
    const hostelId = parseInt(req.params.id, 10);
    const hostel = hostels.find((h) => h.id === hostelId);
    if (hostel) {
        res.json({ message: 'Hostel retrieved successfully', hostel });
    }
    else {
        res.status(404).json({ error: 'Hostel not found' });
    }
};
exports.getHostelById = getHostelById;
const updateHostel = (req, res) => {
    const hostelId = parseInt(req.params.id, 10);
    const hostel = hostels.find((h) => h.id === hostelId);
    if (hostel) {
        hostel.hotel_name = req.body.hotel_name;
        hostel.location = req.body.location;
        hostel.images = req.body.images || null;
        hostel.description = req.body.description || null;
        hostel.price = req.body.price || null;
        res.json({ message: 'Hostel updated successfully', hostel });
    }
    else {
        res.status(404).json({ error: 'Hostel not found' });
    }
};
exports.updateHostel = updateHostel;
const deleteHostel = (req, res) => {
    const hostelId = parseInt(req.params.id, 10);
    const index = hostels.findIndex((h) => h.id === hostelId);
    if (index !== -1) {
        hostels.splice(index, 1);
        return res.status(204).json({ message: 'Hostel deleted successfully' });
    }
    else {
        return res.status(404).json({ error: 'Hostel not found' });
    }
};
exports.deleteHostel = deleteHostel;
