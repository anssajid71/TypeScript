'use strict';
import { Model, DataTypes, Association, Sequelize } from 'sequelize';

interface ServicesModelAttributes {
  id: number; 
  package_id: number;
  service_name: string;
}

interface ServicesModelCreationAttributes extends ServicesModelAttributes {
}

class Services extends Model<ServicesModelAttributes, ServicesModelCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    throw new Error('Method not implemented.');
  }
  public id!: number; 
  public package_id!: number;
  public service_name!: string;

  public static associate(models: any): void {
    Services.hasMany(models.Packages, {
      foreignKey: 'package_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'packages',
    });
  }
}

export function initServicesModel(sequelize: Sequelize): void {
  Services.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      package_id: DataTypes.INTEGER,
      service_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Services',
    }
  );
}

export default Services;
