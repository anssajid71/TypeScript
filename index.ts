import express, { Request, Response } from 'express';
import userRoutes from './routes/user.route';
import serviceRoutes from './routes/services.route';
import packageRoutes from './routes/packages.route';
import hotelRoutes from './routes/hotels.route';
import companiesRoutes from './routes/companies.route';
import bookingsRoutes from './routes/bookings.route';
import attachmentsRoutes from './routes/attachments.route';
import swaggerRoutes from './routes/swagger';
import bodyParser from 'body-parser';
import sequelize from './config/sequelize';

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });




import fs from 'fs';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerFilePath = 'swagger.json';

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
app.use(bodyParser.json());


app.use('/user', userRoutes);
app.use('/api-docs', swaggerRoutes);

app.use('/services', serviceRoutes);
app.use('/packages', packageRoutes);
app.use('/hotels', hotelRoutes);
app.use('/companies', companiesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/attachments', attachmentsRoutes);

const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// hjdscjdscjsdjs