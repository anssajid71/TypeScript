import { Router } from 'express';
import { userValidationRules } from '../validations/user.validation';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signin', userValidationRules, userController.signInUser);
router.post('/signup', userValidationRules, userController.createUser);
router.get('/getall', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidationRules, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
