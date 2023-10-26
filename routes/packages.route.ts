import { Router } from 'express';
import { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } from '../controllers/packages.controller';
import { createPackageValidationRules } from '../validations/packages.validation';

const router = Router();

/**
 * @swagger
 * definitions:
 *   Package:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       price:
 *         type: number
 *       start_date:
 *         type: string
 *         format: date
 *       end_date:
 *         type: string
 *         format: date
 *       total_days:
 *         type: integer
 *       type:
 *         type: string
 *       images:
 *         type: string
 *       available_seats:
 *         type: integer
 *       location:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
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
 *       - Packages
 *     summary: Create a new package
 *     description: Creates a new package.
 *     parameters:
 *       - name: Package
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       201:
 *         description: Package created successfully.
 *         schema:
 *           $ref: '#/definitions/Package'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */


router.post('/create', createPackageValidationRules, createPackage);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get a list of packages
 *     description: Returns a list of packages.
 *     responses:
 *       200:
 *         description: A list of packages.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Package'
 *     security:
 *       - JWT: []
 */


router.get('/getall', getAllPackages);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get a package by ID
 *     description: Returns a package by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Package ID.
 *     responses:
 *       200:
 *         description: Package found successfully.
 *         schema:
 *           $ref: '#/definitions/Package'
 *       404:
 *         description: Package not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */

router.get('/:id', getPackageById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Packages
 *     summary: Update a package by ID
 *     description: Updates a package by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Package ID.
 *       - name: Package
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       200:
 *         description: Package updated successfully.
 *         schema:
 *           $ref: '#/definitions/Package'
 *       404:
 *         description: Package not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */

router.put('/:id', createPackageValidationRules, updatePackage);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - Packages
 *     summary: Delete a package by ID
 *     description: Deletes a package by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: Package ID.
 *     responses:
 *       204:
 *         description: Package deleted successfully.
 *       404:
 *         description: Package not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */

router.delete('/:id', deletePackage);

export default router;