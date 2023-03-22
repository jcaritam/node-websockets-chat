import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  saveUser,
  updateUser,
} from '../controllers/user.controller';
import {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from '../validators/user.validator';

const router = Router();

router.get('', getAllUsers);

router.get('/:id', getUserById);

router.post('', createUserValidator, saveUser);

router.put('/:id', updateUserValidator, updateUser);

router.delete('/:id', deleteUserValidator, deleteUser);

export default router;
