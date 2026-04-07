import { Router } from 'express';
import { TaskController } from './tasks.controller.js';

const router = Router();

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.post('/', TaskController.create);
router.patch('/:id/complete', TaskController.complete);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);

export default router;