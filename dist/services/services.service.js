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
exports.getAllServices = exports.getServiceById = exports.deleteService = exports.updateService = exports.createService = void 0;
const services_1 = __importDefault(require("../models/services"));
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newService = yield services_1.default.create(serviceData);
        return newService;
    }
    catch (error) {
        throw error;
    }
});
exports.createService = createService;
const updateService = (serviceId, serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rowsUpdated] = yield services_1.default.update(serviceData, {
            where: { id: serviceId },
        });
        if (rowsUpdated === 0) {
            throw new Error('Service not found or no updates were made.');
        }
        const updatedService = yield services_1.default.findByPk(serviceId);
        return updatedService;
    }
    catch (error) {
        throw error;
    }
});
exports.updateService = updateService;
const deleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield services_1.default.destroy({
            where: { id: serviceId },
        });
        if (rowsDeleted === 0) {
            throw new Error('Service not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteService = deleteService;
const getServiceById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield services_1.default.findByPk(serviceId);
        return service;
    }
    catch (error) {
        throw error;
    }
});
exports.getServiceById = getServiceById;
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_1.default.findAll();
        return services;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllServices = getAllServices;
