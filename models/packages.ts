'use strict';
import { Model, DataTypes, Association, Sequelize } from 'sequelize';

interface PackagesModelAttributes {
  id: number;
  name: string;
  email: string;
  price: number | null;
  start_date: Date | null;
  end_date: Date | null;
  total_days: number | null;
  type: string;
  images: string | null;
  available_seats: number | null;
  location: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface PackagesModelCreationAttributes extends PackagesModelAttributes {
}

class Packages extends Model<PackagesModelAttributes, PackagesModelCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public name!: string;
  public email!: string;
  public price!: number | null;
  public start_date!: Date | null;
  public end_date!: Date | null;
  public total_days!: number | null;
  public type!: string;
  public images!: string | null;
  public available_seats!: number | null;
  public location!: string | null;
  public created_at!: string | null;
  public updated_at!: string | null;

  public static associate(models: any): void {
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

export function initPackagesModel(sequelize: Sequelize): void {
  Packages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, 
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      price: DataTypes.DECIMAL,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total_days: DataTypes.INTEGER,
      type: DataTypes.STRING,
      images: DataTypes.STRING,
      available_seats: DataTypes.INTEGER,
      location: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Packages',
    }
  );
}

export default Packages;
