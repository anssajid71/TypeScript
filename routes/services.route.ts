import { Router } from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService } from '../controllers/services.controller';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Service:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       package_id:
 *         type: integer
 *       service_name:
 *         type: string
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */

/**
 * @swagger
 * /create:
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
router.post('/create', createService);

/**
 * @swagger
 * /getall:
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
router.get('/getall', getAllServices);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Service
 *     summary: Get a service by ID
 *     description: Returns a service by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Service ID.
 *     responses:
 *       200:
 *         description: Service found successfully.
 *         schema:
 *           $ref: '#/definitions/Service'
 *       404:
 *         description: Service not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.get('/:id', getServiceById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Service
 *     summary: Update a service by ID
 *     description: Updates a service by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Service ID.
 *       - name: Service
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully.
 *         schema:
 *           $ref: '#/definitions/Service'
 *       404:
 *         description: Service not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.put('/:id', updateService);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Service
 *     summary: Delete a service by ID
 *     description: Deletes a service by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Service ID.
 *     responses:
 *       204:
 *         description: Service deleted successfully.
 *       404:
 *         description: Service not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.delete('/:id', deleteService);

export default router;
