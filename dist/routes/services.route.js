"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_controller_1 = require("../controllers/services.controller");
const services_validation_1 = require("../validations/services.validation");
const router = (0, express_1.Router)();
router.post('/signup', services_validation_1.serviceValidationRules, services_controller_1.createService);
router.get('/getall', services_validation_1.serviceValidationRules, services_controller_1.getAllServices);
exports.default = router;
