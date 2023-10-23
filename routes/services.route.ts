import { Router } from 'express';
import { createService, getAllServices } from '../controllers/services.controller';
import { serviceValidationRules } from '../validations/services.validation';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Service:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */

// Apply the token verification middleware to all routes in this router

/**
 * @swagger
 * /services/signup:
 *   post:
 *     tags:
 *       - Service
 *     summary: Create a new service
 *     description: Creates a new service.
 *     parameters:
 *       - name: Service
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Service'
 *     responses:
 *       201:
 *         description: Service created successfully.
 *         schema:
 *           $ref: '#/definitions/Service'
 *     security:
 *       - JWT: []
 */
router.post('/services/signup', serviceValidationRules, createService);

/**
 * @swagger
 * /services/getall:
 *   get:
 *     tags:
 *       - Service
 *     summary: Get a list of services
 *     description: Returns a list of services.
 *     responses:
 *       200:
 *         description: A list of services.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Service'
 *     security:
 *       - JWT: []
 */
router.get('/services/getall', getAllServices);

export default router;
