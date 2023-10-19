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
exports.deleteCompany = exports.getCompanyById = exports.getAllCompanies = exports.updateCompany = exports.createCompany = void 0;
const companies_1 = __importDefault(require("../models/companies"));
const createCompany = (companyData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompany = yield companies_1.default.create(companyData);
        return newCompany;
    }
    catch (error) {
        throw error;
    }
});
exports.createCompany = createCompany;
const updateCompany = (companyId, companyData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCompany = yield companies_1.default.update(companyData, {
            where: { id: companyId },
        });
        if (updatedCompany[0] === 0) {
            throw new Error('Company not found or no updates were made.');
        }
        const company = yield companies_1.default.findByPk(companyId);
        return company;
    }
    catch (error) {
        throw error;
    }
});
exports.updateCompany = updateCompany;
const getAllCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield companies_1.default.findAll();
        return companies;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllCompanies = getAllCompanies;
const getCompanyById = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companies_1.default.findByPk(companyId);
        if (!company) {
            throw new Error('Company not found.');
        }
        return company;
    }
    catch (error) {
        throw error;
    }
});
exports.getCompanyById = getCompanyById;
const deleteCompany = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield companies_1.default.destroy({
            where: { id: companyId },
        });
        if (rowsDeleted === 0) {
            throw Error('Company not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCompany = deleteCompany;
