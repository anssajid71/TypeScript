"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { jwtSecret } from '../env';
// const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const header: string | undefined = req.headers.authorization;
//   if (header) {
//     const token: string = header.split(' ')[1];
//     try {
//       const decoded: any = jwt.verify(token, jwtSecret);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({ error: 'Invalid Token' });
//     }
//   } else {
//     res.status(401).json({ error: 'No Token Provided' });
//   }
// };
// export default jwtAuthMiddleware;
