"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCompaniesModel = void 0;
const sequelize_1 = require("sequelize");
class Companies extends sequelize_1.Model {
    static associate(models) {
        Companies.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    }
}
function initCompaniesModel(sequelize) {
    Companies.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: sequelize_1.DataTypes.INTEGER,
        name: sequelize_1.DataTypes.STRING,
        logo: sequelize_1.DataTypes.STRING,
        phone_number: sequelize_1.DataTypes.STRING,
        payment_status: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Companies',
    });
}
exports.initCompaniesModel = initCompaniesModel;
exports.default = Companies;
