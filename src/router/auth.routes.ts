import { login, register } from '../controllers/auth.controller';
import { Router } from 'express';
import { loginValidator } from '../validators/auth.validator';

const router = Router();

router.post('/login', loginValidator, login);

router.post('/register', register);

export default router;
