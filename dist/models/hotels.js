'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHotelsModel = void 0;
const sequelize_1 = require("sequelize");
class Hotels extends sequelize_1.Model {
    static initialize(sequelize) {
        throw new Error('Method not implemented.');
    }
    static associate(models) {
        Hotels.hasMany(models.Packages, {
            foreignKey: 'id',
            as: 'packages',
        });
        Hotels.belongsTo(models.Attachments, {
            foreignKey: 'attachment_id',
            as: 'attachments',
        });
    }
}
function initHotelsModel(sequelize) {
    Hotels.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        hotel_name: sequelize_1.DataTypes.STRING,
        location: sequelize_1.DataTypes.STRING,
        images: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.TEXT,
        price: sequelize_1.DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Hotels',
    });
}
exports.initHotelsModel = initHotelsModel;
exports.default = Hotels;
