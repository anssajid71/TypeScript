import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize';


interface ServicesModelAttributes {
  id: number;
  package_id: number;
  service_name: string;
}

interface ServicesModelCreationAttributes extends ServicesModelAttributes {}

class Services extends Model<ServicesModelAttributes, ServicesModelCreationAttributes> {
  public id!: number;
  public package_id!: number;
  public service_name!: string;
}

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
    tableName: 'Services',
    }
  );

export default Services;
