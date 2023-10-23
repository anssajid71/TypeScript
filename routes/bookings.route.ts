import { Router } from 'express';
import { bookingValidationRules } from '../validations/bookings.validation';
import * as bookingController from '../controllers/bookings.controller';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Booking:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       user_id:
 *         type: integer
 *       package_id:
 *         type: integer
 *       date:
 *         type: string
 *         format: date
 *       type:
 *         type: string
 *         enum:
 *           - flight
 *           - hotel
 *           - car_rental
 *       total_number_of_persons:
 *         type: integer
 *       pickup_location:
 *         type: string
 *       total_cost:
 *         type: number
 *       status:
 *         type: string
 *         enum:
 *           - pending
 *           - confirmed
 *           - canceled
 *       payment_method:
 *         type: string
 *       payment_status:
 *         type: string
 *         enum:
 *           - pending
 *           - completed
 *           - failed
 *       payment_date:
 *         type: string
 *         format: date
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
 *       - Bookings
 *     summary: Create a new booking
 *     description: Creates a new booking.
 *     parameters:
 *       - name: Booking
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         schema:
 *           $ref: '#/definitions/Booking'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */

router.post('/create', bookingValidationRules, bookingController.createBooking);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get a list of bookings
 *     description: Returns a list of bookings.
 *     responses:
 *       200:
 *         description: A list of bookings.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Booking'
 * *     security:
 *       - JWT: []
 */
router.get('/getall', bookingController.getAllBookings);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get a booking by ID
 *     description: Returns a booking by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Booking ID.
 *     responses:
 *       200:
 *         description: Booking found successfully.
 *         schema:
 *           $ref: '#/definitions/Booking'
 *       404:
 *         description: Booking not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Bookings
 *     summary: Update a booking by ID
 *     description: Updates a booking by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Booking ID.
 *       - name: Booking
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully.
 *         schema:
 *           $ref: '#/definitions/Booking'
 *       404:
 *         description: Booking not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.put('/:id', bookingValidationRules, bookingController.updateBooking);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Bookings
 *     summary: Delete a booking by ID
 *     description: Deletes a booking by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Booking ID.
 *     responses:
 *       200:
 *         description: Booking deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Booking not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * *     security:
 *       - JWT: []
 */
router.delete('/:id', bookingController.deleteBooking);

export default router;