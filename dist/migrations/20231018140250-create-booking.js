// migrations/<timestamp>-create-booking.ts
'use strict';
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
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Bookings', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            package_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            type: {
                type: sequelize_1.DataTypes.ENUM('flight', 'hotel', 'car_rental'),
                allowNull: false,
            },
            total_number_of_persons: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            pickup_location: {
                type: sequelize_1.DataTypes.STRING,
            },
            total_cost: {
                type: sequelize_1.DataTypes.DECIMAL,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'canceled'),
            },
            payment_method: {
                type: sequelize_1.DataTypes.STRING,
            },
            payment_status: {
                type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'failed'),
            },
            payment_date: {
                type: sequelize_1.DataTypes.STRING,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
    }),
    down: (queryInterface, sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Bookings');
    }),
};
