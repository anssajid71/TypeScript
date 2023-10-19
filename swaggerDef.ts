// /**
//  * @swagger
//  * definitions:
//  *   User:
//  *     properties:
//  *       id:
//  *         type: integer
//  *       name:
//  *         type: string
//  *       email:
//  *         type: string
//  *   ErrorResponse:
//  *     properties:
//  *       error:
//  *         type: string
//  *     required:
//  *       - error
//  */

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Get a list of users
//  *     description: Returns a list of users.
//  *     responses:
//  *       200:
//  *         description: A list of users.
//  *         schema:
//  *           type: array
//  *           items:
//  *             $ref: '#/definitions/User'
//  *       500:
//  *         description: Internal server error.
//  *         schema:
//  *           $ref: '#/definitions/ErrorResponse'
//  */

// /**
//  * @swagger
//  * /users/{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     description: Returns a user by ID.
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         type: integer
//  *         description: User ID.
//  *     responses:
//  *       200:
//  *         description: A user object.
//  *         schema:
//  *           $ref: '#/definitions/User'
//  *       404:
//  *         description: User not found.
//  *         schema:
//  *           $ref: '#/definitions/ErrorResponse'
//  */

// // Define more routes and models here as needed
