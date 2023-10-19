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
exports.findUserByEmail = exports.getAllUser = exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
        userData.password = hashedPassword;
        return yield user_1.default.create(userData);
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rowsUpdated] = yield user_1.default.update(userData, {
            where: { id: userId },
        });
        if (rowsUpdated === 0) {
            throw new Error('User not found or no updates were made.');
        }
        const updatedUser = yield user_1.default.findByPk(userId);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield user_1.default.destroy({
            where: { id: userId },
        });
        if (rowsDeleted === 0) {
            throw new Error('User not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUser = getAllUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_1.default.findOne({ where: { email } });
    }
    catch (error) {
        throw error;
    }
});
exports.findUserByEmail = findUserByEmail;
