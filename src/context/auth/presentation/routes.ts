import { Router } from 'express';
import { refreshToken, signIn } from './controller';

const router = Router();

router.post('/sign-in', signIn);
router.post('/refresh-token', refreshToken);

export default router;
