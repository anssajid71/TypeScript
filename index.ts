import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import userRoutes from './routes/user.route';
import serviceRoutes from './routes/services.route';
import packageRoutes from './routes/packages.route';
import hotelRoutes from './routes/hotels.route';
import companiesRoutes from './routes/companies.route';
import bookingsRoutes from './routes/bookings.route';
import attachmentsRoutes from './routes/attachments.route';
import fs from 'fs';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerFilePath = 'swagger.json';

// Check if the swagger.json file exists before generating it
if (!fs.existsSync(swaggerFilePath)) {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'Travel Agent Application',
        version: '1.0.0',
        description: 'API documentation for Travel Agent Application',
      },
    },
    apis: ['swagger.json'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerSpec, null, 2));
}

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

// Read the contents of the swagger.json file and parse it to a JSON object
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
