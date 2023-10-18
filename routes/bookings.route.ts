import { Router } from 'express';
import { bookingValidationRules } from '../validations/bookings.validation';
import * as bookingController from '../controllers/bookings.controller';

const router = Router();

router.post('/create', bookingValidationRules, bookingController.createBooking);
router.get('/getall', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingValidationRules, bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;