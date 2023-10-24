import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'mydb',
  username: 'typescript2',
  password: 'password',
  host: 'localhost', 
  dialect: 'postgres',
});

export default sequelize;
