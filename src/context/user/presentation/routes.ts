import { Router } from 'express';
import { all, create } from './controller';

const router = Router();

router.get('/', all);
router.post('/', create);

export default router;
