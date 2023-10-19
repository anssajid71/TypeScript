import { Model, DataTypes, Association, Sequelize } from 'sequelize';

interface BookingModelAttributes {
  id: number; 
  user_id: number;
  package_id: number;
  date: Date;
  type: 'flight' | 'hotel' | 'car_rental';
  total_number_of_persons: number;
  pickup_location: string;
  total_cost: number;
  status: 'pending' | 'confirmed' | 'canceled';
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_date: string;
}

interface BookingModelCreationAttributes extends BookingModelAttributes {
}

class Booking extends Model<BookingModelAttributes, BookingModelCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    throw new Error('Method not implemented.');
  }
  public id!: number; 
  public user_id!: number;
  public package_id!: number;
  public date!: Date;
  public type!: 'flight' | 'hotel' | 'car_rental';
  public total_number_of_persons!: number;
  public pickup_location!: string;
  public total_cost!: number;
  public status!: 'pending' | 'confirmed' | 'canceled';
  public payment_method!: string;
  public payment_status!: 'pending' | 'completed' | 'failed';
  public payment_date!: string;

  public static associate(models: any): void {
    Booking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Booking.belongsTo(models.Packages, {
      foreignKey: 'package_id',
      as: 'packages',
    });
  }
}

export function initBookingModel(sequelize: Sequelize): void {
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      package_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      type: DataTypes.ENUM('flight', 'hotel', 'car_rental'),
      total_number_of_persons: DataTypes.INTEGER,
      pickup_location: DataTypes.STRING,
      total_cost: DataTypes.DECIMAL,
      status: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.ENUM('pending', 'completed', 'failed'),
      payment_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
}

export default Booking;
