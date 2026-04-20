import { Router } from 'express';
import { addObservation } from '../controllers/obsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router: Router = Router();

// Both Admins and Agents can add observations
router.post('/', protect, addObservation);

export default router;