import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserModelAttributes {
  id: number; // Add the 'id' attribute
  name: string;
  email: string;
  phone_number: string | null;
  password: string;
  role: 'admin' | 'user';
}

interface UserModelCreationAttributes extends UserModelAttributes {
}

class User extends Model<UserModelAttributes, UserModelCreationAttributes> {
  public id!: number; // Define the 'id' attribute
  public name!: string;
  public email!: string;
  public phone_number!: string | null;
  public password!: string;
  public role!: 'admin' | 'user';

  public static associate(models: any): void {
    User.hasMany(models.Packages, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'users',
    });

    User.hasOne(models.Companies, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'companies',
    });

    User.hasMany(models.Booking, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'booking',
    });
  }
}

export function initUserModel(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, // Define the 'id' attribute in the init function
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );
}

export default User;
