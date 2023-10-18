// migrations/<timestamp>-create-booking.ts
'use strict';
import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('flight', 'hotel', 'car_rental'),
        allowNull: false,
      },
      total_number_of_persons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pickup_location: {
        type: DataTypes.STRING,
      },
      total_cost: {
        type: DataTypes.DECIMAL,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
      },
      payment_method: {
        type: DataTypes.STRING,
      },
      payment_status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
      },
      payment_date: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
