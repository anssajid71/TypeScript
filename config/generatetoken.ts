import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiration } from './env';

console.log('JWT Secret:', jwtSecret);
console.log('JWT Expiration:', jwtExpiration);


// Define the payload type for the JWT
interface TokenPayload {
  id: number;
  email: string;
}

function generateToken(user: TokenPayload): string {
  const payload: TokenPayload = {
    id: 123, // Change this according to your requirements
    email: user.email,
  };

  const options: jwt.SignOptions = {
    expiresIn: '1m',
  };

  return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export { generateToken, verifyToken };
