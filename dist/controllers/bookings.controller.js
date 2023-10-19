"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
let bookings = [];
const createBooking = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newBooking = {
        id: bookings.length + 1,
        user_id: req.body.user_id,
        package_id: req.body.package_id,
        date: new Date(req.body.date),
        type: req.body.type,
        total_number_of_persons: req.body.total_number_of_persons,
        pickup_location: req.body.pickup_location,
        total_cost: req.body.total_cost,
        status: req.body.status,
        payment_method: req.body.payment_method,
        payment_status: req.body.payment_status,
        payment_date: new Date(req.body.payment_date),
    };
    bookings.push(newBooking);
    const expiresIn = '1m';
    const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking, token });
};
exports.createBooking = createBooking;
const getAllBookings = (req, res) => {
    res.json({ message: 'All bookings retrieved successfully', bookings });
};
exports.getAllBookings = getAllBookings;
const getBookingById = (req, res) => {
    const bookingId = parseInt(req.params.id, 10);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
        res.json({ message: 'Booking retrieved successfully', booking });
    }
    else {
        res.status(404).json({ error: 'Booking not found' });
    }
};
exports.getBookingById = getBookingById;
const updateBooking = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const bookingId = parseInt(req.params.id, 10);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
        booking.user_id = req.body.user_id;
        booking.package_id = req.body.package_id;
        booking.date = new Date(req.body.date);
        booking.type = req.body.type;
        booking.total_number_of_persons = req.body.total_number_of_persons;
        booking.pickup_location = req.body.pickup_location;
        booking.total_cost = req.body.total_cost;
        booking.status = req.body.status;
        booking.payment_method = req.body.payment_method;
        booking.payment_status = req.body.payment_status;
        booking.payment_date = new Date(req.body.payment_date);
        res.json({ message: 'Booking updated successfully', booking });
    }
    else {
        res.status(404).json({ error: 'Booking not found' });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => {
    const bookingId = parseInt(req.params.id, 10);
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
        bookings.splice(index, 1);
        return res.status(204).json({ message: 'Booking deleted successfully' });
    }
    else {
        return res.status(404).json({ error: 'Booking not found' });
    }
};
exports.deleteBooking = deleteBooking;
