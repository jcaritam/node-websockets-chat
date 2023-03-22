import { Router } from 'express';
import { search } from '../controllers/search.controller';

const router = Router();

router.get('/:collection/:term', search);

export default router;
