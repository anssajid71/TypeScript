"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAttachmentsModel = void 0;
const sequelize_1 = require("sequelize");
class Attachments extends sequelize_1.Model {
    static associate(models) {
        Attachments.hasMany(models.Hotels, {
            foreignKey: 'attachment_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'hotels',
        });
    }
}
function initAttachmentsModel(sequelize) {
    Attachments.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        attachment_id: sequelize_1.DataTypes.INTEGER,
        attachment_type: sequelize_1.DataTypes.STRING,
        attachment_url: sequelize_1.DataTypes.STRING,
        created_at: sequelize_1.DataTypes.STRING,
        updated_at: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Attachments',
    });
}
exports.initAttachmentsModel = initAttachmentsModel;
exports.default = Attachments;
