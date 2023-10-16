import { Router } from 'express';
import { hotelValidationRules } from '../validations/hotels.validation';
import * as hotelController from '../controllers/hotels.controller';

const router = Router();

router.post('/create', hotelValidationRules, hotelController.createHotel);
router.get('/getall', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelValidationRules, hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

export default router;
