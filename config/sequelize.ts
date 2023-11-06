import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'mydb',
  username: 'newuser',
  password: 'password',
  host: 'localhost', 
  dialect: 'postgres',
});

export default sequelize;
