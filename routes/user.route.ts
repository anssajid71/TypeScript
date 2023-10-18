import { Router } from 'express';
import { validateSignUpRequest } from '../validations/user.validation';
import { validateSignInRequest } from '../validations/user.validation';

import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signin', validateSignInRequest, userController.signInUser);
router.post('/signup', validateSignUpRequest, userController.createUser);
router.get('/getall', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;