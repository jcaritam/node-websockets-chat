import { body } from 'express-validator';
import { validateFields } from '../middlewares';

export const loginValidator = [
  body('email', 'The email is required').isEmail(),
  body('password', 'The password is required').notEmpty(),
  validateFields,
];
