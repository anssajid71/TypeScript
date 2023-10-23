import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

const router = Router();

const swaggerDefinition = {
  info: {
    title: 'Travel Agent Application',
    version: '1.0.0',
    description: 'API documentation for Travel Agent Application',
  },
  basePath: '/user',
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
};const definitions = {
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        phone_number: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
    },
  };
  

const options = {
  swaggerDefinition,
  apis: ['routes/user.route.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
