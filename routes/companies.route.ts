import { Router } from 'express';
import { companyValidationRules } from '../validations/companies.validation';
import * as companyController from '../controllers/companies.controller';

const router = Router();

router.post('/create', companyValidationRules, companyController.createCompany);
router.get('/getall', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyValidationRules, companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

export default router;