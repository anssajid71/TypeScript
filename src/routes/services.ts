import { Router } from 'express';
import { createService, getAllServices } from '../controllers/services.controller';
import { serviceValidationRules } from '../validations/services.validation';

const router = Router();
router.post('/signup', serviceValidationRules, createService);
router.get('/getall', serviceValidationRules, getAllServices);

export default router;
