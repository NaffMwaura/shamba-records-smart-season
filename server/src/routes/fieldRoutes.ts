import { Router } from 'express';
import { getFields, createField } from '../controllers/fieldController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router: Router = Router();

// To see fields, you MUST be logged in (protect)
router.get('/', protect, getFields);

// To create a field, you MUST be logged in AND an Admin (protect + adminOnly)
router.post('/', protect, adminOnly, createField);

export default router;