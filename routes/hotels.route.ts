import { Router } from 'express';
import { hotelValidationRules } from '../validations/hotels.validation';
import * as hotelController from '../controllers/hotels.controller';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Hotel:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       hotel_name:
 *         type: string
 *       location:
 *         type: string
 *       images:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *
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
 *       - Hotels
 *     summary: Create a new hotel
 *     description: Creates a new hotel.
 *     parameters:
 *       - name: Hotel
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       201:
 *         description: Hotel created successfully.
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */


router.post('/create', hotelValidationRules, hotelController.createHotel);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get a list of hotels
 *     description: Returns a list of hotels.
 *     responses:
 *       200:
 *         description: A list of hotels.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Hotel'
 *     security:
 *       - JWT: []
 */

router.get('/getall', hotelController.getAllHotels);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get a hotel by ID
 *     description: Returns a hotel by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Hotel ID.
 *     responses:
 *       200:
 *         description: Hotel found successfully.
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *       404:
 *         description: Hotel not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */


router.get('/:id', hotelController.getHotelById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Hotels
 *     summary: Update a hotel by ID
 *     description: Updates a hotel by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Hotel ID.
 *       - name: Hotel
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       200:
 *         description: Hotel updated successfully.
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *       404:
 *         description: Hotel not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */


router.put('/:id', hotelValidationRules, hotelController.updateHotel);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Hotels
 *     summary: Delete a hotel by ID
 *     description: Deletes a hotel by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Hotel ID.
 *     responses:
 *       204:
 *         description: Hotel deleted successfully.
 *       404:
 *         description: Hotel not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */

router.delete('/:id', hotelController.deleteHotel);

export default router;