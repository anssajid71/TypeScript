import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

export function generateToken({ data, expiresIn }: { data: object; expiresIn: string; }): string {
  return jwt.sign(data, JWT_SECRET, { expiresIn });
}

export function authenticateToken(req: { headers: { [x: string]: any }; user: any }, res: { sendStatus: (arg0: number) => void }, next: () => void) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
    
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
