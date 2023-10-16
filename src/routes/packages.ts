import { Router } from 'express';
import { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } from '../controllers/packages.controller';
import { createPackageValidationRules } from '../validations/packages.validation';

const router = Router();

router.post('/signup', createPackageValidationRules, createPackage);
router.get('/getall', getAllPackages);
router.get('/:id', getPackageById);
router.put('/:id', createPackageValidationRules, updatePackage);
router.delete('/:id', deletePackage);

export default router;
