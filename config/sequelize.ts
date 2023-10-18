import { Pool } from 'pg';

const pool = new Pool({
  user: 'manssajid',
  host: 'localhost',
  database: 'typescript_db',
  password: 'password',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

export default pool;
