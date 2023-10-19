import { Model, DataTypes, Association, Sequelize } from 'sequelize';

interface CompaniesModelAttributes {
  id: number; 
  user_id: number;
  name: string;
  logo: string | null;
  phone_number: string | null;
  payment_status: string | null;
}

interface CompaniesModelCreationAttributes extends CompaniesModelAttributes {
}

class Companies extends Model<CompaniesModelAttributes, CompaniesModelCreationAttributes> {
  public id!: number; 
  public user_id!: number;
  public name!: string;
  public logo!: string | null;
  public phone_number!: string | null;
  public payment_status!: string | null;

  public static associate(models: any): void {
    Companies.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export function initCompaniesModel(sequelize: Sequelize): void {
  Companies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      payment_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Companies',
    }
  );
}

export default Companies;
