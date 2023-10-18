import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize'; // Import Sequelize
import userRoutes from './routes/user.route';
import serviceRoutes from './routes/services.route';
import packageRoutes from './routes/packages.route';
import hotelRoutes from './routes/hotels.route';
import companiesRoutes from './routes/companies.route';
import bookingsRoutes from './routes/bookings.route';
import attachmentsRoutes from './routes/attachments.route';
import Services from './models/services';
import Packages from './models/packages';
import Booking from './models/booking';
import Hotels from './models/hotels';
import Companies from './models/companies';
// import User from './models/user'; // Import your User model
// import {Services} from './models/services'; // Import your Service model
// import {Packages} from './models/packages'; // Import your Package model
// import {Hotels} from './models/hotels'; // Import your Hotel model
// import Company from './models/companies'; // Import your Company model
// import {Booking} from './models/booking'; // Import your Booking model
// import Attachment from './models/attachments'; // Import your Attachment model

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Define your Sequelize configuration
const sequelize = new Sequelize('muhammadanassajid', 'database', 'typescript', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

// // Initialize your models
// // User.initialize(sequelize);
// Services.initialize(sequelize);
// Packages.initialize(sequelize);
// Hotels.initialize(sequelize);
// Companies.initialize(sequelize);
// Booking.initialize(sequelize);
// Attachment.initialize(sequelize);

// // Associate your models (if they have associations)
// User.associate({ Service, Package, Hotel, Company, Booking, Attachment });
// Service.associate({ User, Package, Hotel, Company, Booking, Attachment });
// Package.associate({ User, Service, Hotel, Company, Booking, Attachment });
// Hotel.associate({ User, Service, Package, Company, Booking, Attachment });
// Company.associate({ User, Service, Package, Hotel, Booking, Attachment });
// Booking.associate({ User, Service, Package, Hotel, Company, Attachment });
// Attachment.associate({ User, Service, Package, Hotel, Company, Booking });

app.use('/user', userRoutes);
app.use('/services', serviceRoutes);
app.use('/packages', packageRoutes);
app.use('/hotels', hotelRoutes);
app.use('/companies', companiesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/attachments', attachmentsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
