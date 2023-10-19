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
exports.deleteCompany = exports.updateCompany = exports.getCompanyById = exports.getAllCompanies = exports.createCompany = void 0;
const companies_1 = __importDefault(require("../models/companies"));
const express_validator_1 = require("express-validator");
const generatetoken_1 = require("../config/generatetoken");
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newCompany = {
            id: companies_1.default.length + 1,
            user_id: req.body.user_id,
            name: req.body.name,
            logo: req.body.logo || null,
            phone_number: req.body.phone_number || null,
            payment_status: req.body.payment_status || null,
        };
        const expiresIn = '1m';
        const token = (0, generatetoken_1.generateToken)({ data: { user: 'example' }, expiresIn });
        res.status(201).json({ message: 'Company created successfully', company: newCompany, token });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the company' });
    }
});
exports.createCompany = createCompany;
const getAllCompanies = (req, res) => {
    companies_1.default.findAll().then((companies) => {
        res.json({ message: 'All companies retrieved successfully', companies });
    });
};
exports.getAllCompanies = getAllCompanies;
const getCompanyById = (req, res) => {
    const companyId = parseInt(req.params.id);
    companies_1.default.findByPk(companyId).then((company) => {
        if (company) {
            res.json({ message: 'Company retrieved successfully', company });
        }
        else {
            res.status(404).json({ error: 'Company not found' });
        }
    });
};
exports.getCompanyById = getCompanyById;
const updateCompany = (req, res) => {
    const companyId = parseInt(req.params.id);
    companies_1.default.findByPk(companyId).then((company) => {
        if (company) {
            company.name = req.body.name;
            company.logo = req.body.logo || null;
            company.phone_number = req.body.phone_number || null;
            company.payment_status = req.body.payment_status || null;
            company.save().then(() => {
                res.json({ message: 'Company updated successfully', company });
            });
        }
        else {
            res.status(404).json({ error: 'Company not found' });
        }
    });
};
exports.updateCompany = updateCompany;
const deleteCompany = (req, res) => {
    const companyId = parseInt(req.params.id);
    companies_1.default.findByPk(companyId).then((company) => {
        if (company) {
            company.destroy().then(() => {
                res.status(204).json({ message: 'Company deleted successfully' });
            });
        }
        else {
            res.status(404).json({ error: 'Company not found' });
        }
    });
};
exports.deleteCompany = deleteCompany;
