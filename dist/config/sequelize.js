"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'manssajid',
    host: 'localhost',
    database: 'typescript_db',
    password: 'password',
    port: 5432,
});
pool.on('connect', () => {
    console.log('Connected to the database');
});
pool.on('error', (err) => {
    console.error('Error connecting to the database:', err);
});
exports.default = pool;
