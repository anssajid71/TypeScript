import { Router } from 'express';
import {
  createUser,
  signInUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();


/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phone_number:
 *         type: string
 *       password:
 *         type: string
 *       role:
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
 * /signin:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign in a user
 *     description: Signs in a user.
 *     parameters:
 *       - name: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User signed in successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: Invalid Email address or password.
 *     security:
 *       - JWT: []
 */
router.post('/signin', signInUser);

/**
 * @swagger
 * /getall:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a list of users
 *     description: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *     security:
 *       - JWT: []
 */
router.get('/getall', getAllUsers);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     description: Returns a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User found successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user by ID
 *     description: Updates a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: User ID.
 *       - name: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by ID
 *     description: Deletes a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: User not found.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     description: Creates a new user.
 *     parameters:
 *       - name: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Bad request. Validation error.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     security:
 *       - JWT: []
 */
router.post('/signup', createUser);

export default router;
