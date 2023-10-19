"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBookingModel = void 0;
const sequelize_1 = require("sequelize");
class Booking extends sequelize_1.Model {
    static initialize(sequelize) {
        throw new Error('Method not implemented.');
    }
    static associate(models) {
        Booking.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        Booking.belongsTo(models.Packages, {
            foreignKey: 'package_id',
            as: 'packages',
        });
    }
}
function initBookingModel(sequelize) {
    Booking.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: sequelize_1.DataTypes.INTEGER,
        package_id: sequelize_1.DataTypes.INTEGER,
        date: sequelize_1.DataTypes.DATE,
        type: sequelize_1.DataTypes.ENUM('flight', 'hotel', 'car_rental'),
        total_number_of_persons: sequelize_1.DataTypes.INTEGER,
        pickup_location: sequelize_1.DataTypes.STRING,
        total_cost: sequelize_1.DataTypes.DECIMAL,
        status: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'canceled'),
        payment_method: sequelize_1.DataTypes.STRING,
        payment_status: sequelize_1.DataTypes.ENUM('pending', 'completed', 'failed'),
        payment_date: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
}
exports.initBookingModel = initBookingModel;
exports.default = Booking;
