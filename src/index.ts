import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user';
import serviceRoutes from './routes/services';
import packageRoutes from './routes/packages';
import hotelRoutes from './routes/hotels';
import companiesRoutes from './routes/companies';
import bookingsRoutes from './routes/bookings';
import attachmentsRoutes from './routes/attachments';




const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/user', userRoutes);
app.use('/services', serviceRoutes);
app.use('/packages', packageRoutes);
app.use('/hotels', hotelRoutes);
app.use('/companies', companiesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/attachments', attachmentsRoutes);



// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript Express!');
//   });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong');
// });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  