import { Router } from 'express';
import { createUser, handleValidationErrors, validateUserRegistration } from '../validations/user.validation';

import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signin', validateUserRegistration,  userController.signInUser);
router.post('/signup',validateUserRegistration,  userController.createUser);
router.get('/getall', userController.getAllUsers);
router.get('/:id',  userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id',   userController.deleteUser);

export default router;