import { Router } from 'express';
import {
  logout,
  refreshToken,
  signIn,
  signInProvider,
  verify,
} from './controller';

const router = Router();

router.post('/sign-in-provider', signInProvider);
router.post('/sign-in', signIn);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/verify/:verificationToken', verify);

export default router;
