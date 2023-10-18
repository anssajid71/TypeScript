import { Router } from 'express';
import { hotelValidationRules } from '../validations/hotels.validation';
import * as hotelController from '../controllers/hotels.controller';

const router = Router();

router.post('/create', hotelValidationRules, hotelController.createHostel);
router.get('/getall', hotelController.getAllHostels);
router.get('/:id', hotelController.getHostelById);
router.put('/:id', hotelValidationRules, hotelController.updateHostel);
router.delete('/:id', hotelController.deleteHostel);

export default router;