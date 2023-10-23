import { Router } from 'express';
import { companyValidationRules } from '../validations/companies.validation';
import * as companyController from '../controllers/companies.controller';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Company:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       user_id:
 *         type: integer
 *       name:
 *         type: string
 *       logo:
 *         type: string
 *       phone_number:
 *         type: string
 *       payment_status:
 *         type: string
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
 *       - Companies
 *     summary: Create a new company
 *     description: Creates a new company.
 *     parameters:
 *       - name: Company
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Company'
 *     responses:
 *       201:
 *         description: Company created successfully.
 *         schema:
 *           $ref: '#/definitions/Company'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *  *     security:
 *       - JWT: []
 */

router.post('/create', companyValidationRules, companyController.createCompany);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get a list of companies
 *     description: Returns a list of companies.
 *     responses:
 *       200:
 *         description: A list of companies.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Company'
 *  *     security:
 *       - JWT: []
 */

router.get('/getall', companyController.getAllCompanies);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get a company by ID
 *     description: Returns a company by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Company ID.
 *     responses:
 *       200:
 *         description: Company found successfully.
 *         schema:
 *           $ref: '#/definitions/Company'
 *       404:
 *         description: Company not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *  *     security:
 *       - JWT: []
 */

router.get('/:id', companyController.getCompanyById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Companies
 *     summary: Update a company by ID
 *     description: Updates a company by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Company ID.
 *       - name: Company
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully.
 *         schema:
 *           $ref: '#/definitions/Company'
 *       404:
 *         description: Company not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *  *     security:
 *       - JWT: []
 */

router.put('/:id', companyValidationRules, companyController.updateCompany);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Companies
 *     summary: Delete a company by ID
 *     description: Deletes a company by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Company ID.
 *     responses:
 *       200:
 *         description: Company deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Company not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *  *     security:
 *       - JWT: []
 */
router.delete('/:id', companyController.deleteCompany);

export default router;