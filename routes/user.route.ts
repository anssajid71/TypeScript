import { Router } from 'express';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

let users: UserData[] = [];

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
 * /user/signin:
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
router.post('/user/signin', (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userEmail = req.body.email;
  const user = users.find((u) => u.email === userEmail);

  if (!user) {
    return res.status(401).json({ error: 'Invalid Email address or password' });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({ error: 'Invalid Email address or password' });
  }

  const expiresIn = '1m';
  const token = generateToken({ data: { user: user.id }, expiresIn });

  return res.status(200).json({ message: 'User signed in successfully', user, token });
});

/**
 * @swagger
 * /users/getall:
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
router.get('/users/getall', (req: Request, res: Response) => {
  return res.status(200).json(users);
});

/**
 * @swagger
 * /user/{id}:
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
router.get('/user/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    return res.status(200).json({ message: 'User found successfully', user });
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
});

/**
 * @swagger
 * /user/{id}:
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
router.put('/user/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // Update user attributes here based on req.body
    // Modify this route implementation according to your needs
    return res.status(200).json({ message: 'User updated successfully', user });
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
});

/**
 * @swagger
 * /user/{id}:
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
router.delete('/user/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const index = users.findIndex((u) => u.id === userId);
  
    if (index !== -1) {
      users.splice(index, 1);
      return res.status(200).json({ message: 'User deleted successfully' }); // Use status code 200 and include the success message in the response body
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });

/**
 * @swagger
 * /user/signup:
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
router.post('/user/signup', (req: Request, res: Response) => {
  const newUser = req.body as UserData;
  newUser.id = users.length + 1;
  users.push(newUser);

  const expiresIn = '1m';
  const token = generateToken({ data: { user: newUser.id }, expiresIn });

  return res.status(201).json({ message: 'User created successfully', user: newUser, token });
});

export default router;
