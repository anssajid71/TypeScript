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
exports.getAllServices = exports.createService = void 0;
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
let services = [];
let nextServiceId = 1;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newService = {
            id: nextServiceId++,
            package_id: req.body.package_id,
            service_name: req.body.service_name,
        };
        services.push(newService);
        const expiresIn = '1m';
        const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
        res.status(201).json({ message: 'Service created successfully', service: newService, token });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the service' });
    }
});
exports.createService = createService;
// ...
const getAllServices = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'All services retrieved successfully', services });
};
exports.getAllServices = getAllServices;
