import { login, register, googleSignIn } from '../controllers/auth.controller';
import { Router } from 'express';
import { loginValidator, googleValidator } from '../validators/auth.validator';

const router = Router();

router.post('/login', loginValidator, login);

router.post('/register', register);

router.post('/google', googleValidator, googleSignIn);

export default router;
