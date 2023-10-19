'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServicesModel = void 0;
const sequelize_1 = require("sequelize");
class Services extends sequelize_1.Model {
    static initialize(sequelize) {
        throw new Error('Method not implemented.');
    }
    static associate(models) {
        Services.hasMany(models.Packages, {
            foreignKey: 'package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'packages',
        });
    }
}
function initServicesModel(sequelize) {
    Services.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        package_id: sequelize_1.DataTypes.INTEGER,
        service_name: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Services',
    });
}
exports.initServicesModel = initServicesModel;
exports.default = Services;
