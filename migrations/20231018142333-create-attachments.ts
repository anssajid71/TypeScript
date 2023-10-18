'use strict';
import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.createTable('Attachments', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      attachment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      attachment_type: {
        type: DataTypes.STRING,
      },
      attachment_url: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.STRING,
      },
      updated_at: {
        type: DataTypes.STRING,
      },
    });
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.dropTable('Attachments');
  },
};
