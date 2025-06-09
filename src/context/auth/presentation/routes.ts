import { Router } from 'express';
import { logout, refreshToken, signIn } from './controller';

const router = Router();

router.post('/sign-in', signIn);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;
