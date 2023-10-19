"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Packages, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'users',
        });
        User.hasOne(models.Companies, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'companies',
        });
        User.hasMany(models.Booking, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'booking',
        });
    }
}
function initUserModel(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone_number: sequelize_1.DataTypes.STRING,
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.ENUM('admin', 'user'),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
    });
}
exports.initUserModel = initUserModel;
exports.default = User;
