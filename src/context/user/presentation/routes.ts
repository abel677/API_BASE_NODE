import { Router } from 'express';
import { all, create, deleteMany, deleteOne, update } from './controller';

const router = Router();

router.get('/', all);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.post('/delete-many', deleteMany);

export default router;
