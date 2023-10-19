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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.getBookingById = exports.getAllBookings = exports.updateBooking = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = yield booking_1.default.create(bookingData);
        return newBooking;
    }
    catch (error) {
        throw error;
    }
});
exports.createBooking = createBooking;
const updateBooking = (bookingId, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rowsUpdated] = yield booking_1.default.update(bookingData, {
            where: { id: bookingId },
        });
        if (rowsUpdated === 0) {
            throw new Error('Booking not found or no updates were made.');
        }
        const updatedBooking = yield booking_1.default.findByPk(bookingId);
        return updatedBooking;
    }
    catch (error) {
        throw error;
    }
});
exports.updateBooking = updateBooking;
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.default.findAll();
        return bookings;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllBookings = getAllBookings;
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.default.findByPk(bookingId);
        return booking;
    }
    catch (error) {
        throw error;
    }
});
exports.getBookingById = getBookingById;
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield booking_1.default.destroy({
            where: { id: bookingId },
        });
        if (rowsDeleted === 0) {
            throw new Error('Booking not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBooking = deleteBooking;
