import { config } from 'dotenv';

config(); // Load environment variables from the .env file

export const jwtSecret: string | undefined = process.env.REACT_APP_JWT_SECRET;
export const jwtExpiration: string | undefined = process.env.JWT_EXPIRATION;

if (!jwtSecret || !jwtExpiration) {
  throw new Error('Environment variables are missing or incorrect.');
}
