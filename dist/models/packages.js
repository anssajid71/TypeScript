'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPackagesModel = void 0;
const sequelize_1 = require("sequelize");
class Packages extends sequelize_1.Model {
    static initialize(sequelize) {
        throw new Error('Method not implemented.');
    }
    static associate(models) {
        Packages.belongsTo(models.Hotels, {
            foreignKey: 'id',
            as: 'hotels',
        });
        Packages.hasMany(models.Attachments, {
            foreignKey: 'attachment_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'attachments',
        });
        Packages.belongsTo(models.Services, {
            foreignKey: 'package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'services',
        });
    }
}
function initPackagesModel(sequelize) {
    Packages.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: sequelize_1.DataTypes.STRING,
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        price: sequelize_1.DataTypes.DECIMAL,
        start_date: sequelize_1.DataTypes.DATE,
        end_date: sequelize_1.DataTypes.DATE,
        total_days: sequelize_1.DataTypes.INTEGER,
        type: sequelize_1.DataTypes.STRING,
        images: sequelize_1.DataTypes.STRING,
        available_seats: sequelize_1.DataTypes.INTEGER,
        location: sequelize_1.DataTypes.STRING,
        created_at: sequelize_1.DataTypes.STRING,
        updated_at: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Packages',
    });
}
exports.initPackagesModel = initPackagesModel;
exports.default = Packages;
