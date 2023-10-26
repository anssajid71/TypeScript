'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

interface HotelsModelAttributes {
  id: number;
  hotel_name: string;
  location: string;
  images: string | null;
  description: string | null;
  price: number | null;
}

interface HotelsCreationAttributes extends HotelsModelAttributes {}

class Hotels extends Model<HotelsModelAttributes, HotelsCreationAttributes> {
  public id!: number;
  public hotel_name!: string;
  public location!: string;
  public images!: string | null;
  public description!: string | null;
  public price!: number | null;

  public static associate(models: any): void {
    Hotels.hasMany(models.Packages, {
      foreignKey: 'hotelId',
      as: 'packages',
    });
    Hotels.belongsTo(models.Attachments, {
      foreignKey: 'attachment_id',
      as: 'attachments',
    });
  }
}

Hotels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_name: DataTypes.STRING,
    location: DataTypes.STRING,
    images: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: 'Hotels',
  }
);

export default Hotels;
