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
exports.deletePackage = exports.updatePackage = exports.getPackageById = exports.getAllPackages = exports.createPackage = void 0;
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
let packages = [];
let nextPackageId = 1;
const createPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newPackage = {
            id: nextPackageId++,
            name: req.body.name,
            email: req.body.email,
            price: req.body.price,
            start_date: new Date(req.body.start_date),
            end_date: new Date(req.body.end_date),
            total_days: req.body.total_days,
            type: req.body.type,
            images: req.body.images,
            available_seats: req.body.available_seats,
            location: req.body.location,
        };
        packages.push(newPackage);
        const expiresIn = '1m';
        const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
        res.status(201).json({ message: 'Package created successfully', package: newPackage, token });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the package' });
    }
});
exports.createPackage = createPackage;
const getAllPackages = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'All packages retrieved successfully', packages });
};
exports.getAllPackages = getAllPackages;
const getPackageById = (req, res) => {
    const packageId = parseInt(req.params.id, 10);
    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
        res.json({ message: 'Package retrieved successfully', package: pkg });
    }
    else {
        res.status(404).json({ error: 'Package not found' });
    }
};
exports.getPackageById = getPackageById;
const updatePackage = (req, res) => {
    const packageId = parseInt(req.params.id, 10);
    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
        pkg.price = req.body.price;
        pkg.start_date = new Date(req.body.start_date);
        pkg.end_date = new Date(req.body.end_date);
        pkg.total_days = req.body.total_days;
        pkg.type = req.body.type;
        pkg.images = req.body.images;
        pkg.available_seats = req.body.available_seats;
        pkg.location = req.body.location;
        res.json({ message: 'Package updated successfully', package: pkg });
    }
    else {
        res.status(404).json({ error: 'Package not found' });
    }
};
exports.updatePackage = updatePackage;
const deletePackage = (req, res) => {
    const packageId = parseInt(req.params.id, 10);
    const index = packages.findIndex((p) => p.id === packageId);
    if (index !== -1) {
        packages.splice(index, 1);
        return res.status(204).json({ message: 'Package deleted successfully' });
    }
    else {
        return res.status(404).json({ error: 'Package not found' });
    }
};
exports.deletePackage = deletePackage;
