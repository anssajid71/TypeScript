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
exports.getAllPackages = exports.getPackageById = exports.deletePackage = exports.updatePackage = exports.createPackage = void 0;
const packages_1 = __importDefault(require("../models/packages"));
const createPackage = (packageData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPackage = yield packages_1.default.create(packageData);
        return newPackage;
    }
    catch (error) {
        throw error;
    }
});
exports.createPackage = createPackage;
const updatePackage = (packageId, packageData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rowsUpdated] = yield packages_1.default.update(packageData, {
            where: { id: packageId },
        });
        if (rowsUpdated === 0) {
            throw new Error('Package not found or no updates were made.');
        }
        const updatedPackage = yield packages_1.default.findByPk(packageId);
        return updatedPackage;
    }
    catch (error) {
        throw error;
    }
});
exports.updatePackage = updatePackage;
const deletePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield packages_1.default.destroy({
            where: { id: packageId },
        });
        if (rowsDeleted === 0) {
            throw new Error('Package not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deletePackage = deletePackage;
const getPackageById = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('packageId', packageId);
        const packageItem = yield packages_1.default.findByPk(packageId);
        return packageItem;
    }
    catch (error) {
        throw error;
    }
});
exports.getPackageById = getPackageById;
const getAllPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield packages_1.default.findAll();
        return packages;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllPackages = getAllPackages;
