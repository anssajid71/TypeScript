'use strict';
import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      hotel_name: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.STRING, // Add the 'images' attribute
      },
      description: {
        type: DataTypes.TEXT, // Add the 'description' attribute
      },
      price: {
        type: DataTypes.DECIMAL, // Add the 'price' attribute
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.dropTable('Hotels');
  },
};
