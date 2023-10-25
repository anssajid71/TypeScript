import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface PackageAttributes {
  id: number;
  name: string;
  email: string;
  price: number;
  start_date: Date;
  end_date: Date;
  total_days: number;
  type: string;
  images: string;
  available_seats: number;
  location: string;
}
interface PackageCreationAttributes extends Optional<PackageAttributes, 'id'> {}
class Package extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public price!: number;
  public start_date!: Date;
  public end_date!: Date;
  public total_days!: number;
  public type!: string;
  public images!: string;
  public available_seats!: number;
  public location!: string;
}
Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    total_days: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.STRING,
    },
    available_seats: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Packages',
    tableName: 'Packages',
  }
);

export default Package;
