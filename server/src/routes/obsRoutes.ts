import { Router } from 'express';
import { addObservation, getObservations, updateObservation, deleteObservation } from '../controllers/obsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router: Router = Router();

// Both Admins and Agents can add observations
router.post('/', protect, addObservation);
router.get('/', protect, getObservations);
router.patch('/:id', protect, updateObservation);
router.delete('/:id', protect, deleteObservation);

export default router;