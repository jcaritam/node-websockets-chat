import { body, check } from 'express-validator';
import { validateJWT, validateFields, hasRoles } from '../middlewares';
import { ERoles } from '../models/role.model';
import {
  isEmailExist,
  isRoleValid,
  userByIdExist,
} from '../helpers/db-validators';

export const createUserValidator = [
  body('name').isString().notEmpty(),
  body('email').isEmail().notEmpty().custom(isEmailExist),
  body('password', 'Password must have a minimum of 6 characters')
    .isString()
    .notEmpty()
    .isLength({ min: 6 }),
  check('role').custom(isRoleValid),
  validateFields,
];

export const updateUserValidator = [
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(userByIdExist),
  body('role').custom(isRoleValid),
  validateFields,
];

export const deleteUserValidator = [
  validateJWT,
  hasRoles(ERoles.ADMIN),
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(userByIdExist),
  validateFields,
];
