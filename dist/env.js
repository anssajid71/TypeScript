"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExpiration = exports.jwtSecret = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables from the .env file
exports.jwtSecret = process.env.REACT_APP_JWT_SECRET;
exports.jwtExpiration = process.env.JWT_EXPIRATION;
if (!exports.jwtSecret || !exports.jwtExpiration) {
    throw new Error('Environment variables are missing or incorrect.');
}
