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
exports.deleteHotel = exports.getHotelById = exports.getAllHotels = exports.updateHotel = exports.createHotel = void 0;
const hotels_1 = __importDefault(require("../models/hotels"));
const createHotel = (hotelData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHotel = yield hotels_1.default.create(hotelData);
        return newHotel;
    }
    catch (error) {
        throw error;
    }
});
exports.createHotel = createHotel;
const updateHotel = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rowsUpdated] = yield hotels_1.default.update(userData, {
            where: { id: userId },
        });
        if (rowsUpdated === 0) {
            throw new Error('User not found or no updates were made.');
        }
        const updatedHotel = yield hotels_1.default.findByPk(userId);
        return updatedHotel;
    }
    catch (error) {
        throw error;
    }
});
exports.updateHotel = updateHotel;
const getAllHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotels_1.default.findAll();
        return hotels;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllHotels = getAllHotels;
const getHotelById = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotels_1.default.findByPk(hotelId);
        return hotel;
    }
    catch (error) {
        throw error;
    }
});
exports.getHotelById = getHotelById;
const deleteHotel = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield hotels_1.default.destroy({
            where: { id: hotelId },
        });
        if (rowsDeleted === 0) {
            throw new Error('Hotel not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteHotel = deleteHotel;
