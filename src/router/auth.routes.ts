import {
  login,
  register,
  googleSignIn,
  refreshToken,
} from '../controllers/auth.controller';
import { Router } from 'express';
import { loginValidator, googleValidator } from '../validators/auth.validator';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/login', loginValidator, login);

router.post('/register', register);

router.post('/google', googleValidator, googleSignIn);

router.get('/', validateJWT, refreshToken);

export default router;
