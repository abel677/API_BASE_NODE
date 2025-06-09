import { Router } from 'express';
import {
  all,
  create,
  deleteMany,
  deleteOne,
  profile,
  update,
} from './controller';
import { authMiddleware } from '../../../shared/auth.middleware';

const router = Router();

router.get('/', all);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.post('/delete-many', deleteMany);
router.get('/profile', authMiddleware, profile);

export default router;
