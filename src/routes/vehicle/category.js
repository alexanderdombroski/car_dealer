import { Router } from 'express';

import { categoryDeleteController, categoryEditController, categoryPageController } from '../../controllers/vehicle/category.js';
import { requireAdminPrivilages } from '../../middleware/scoped/requireAuth.js';
import { vehiclesPageController } from '../../controllers/vehicle/index.js';

const router = Router({ mergeParams: true });

// Edit Categories
router.get('/', requireAdminPrivilages, categoryPageController);
router.put('/:id', requireAdminPrivilages, categoryEditController);
router.delete('/:id', requireAdminPrivilages, categoryDeleteController);

// Show listings by type
router.get('/:id', vehiclesPageController);

export default router;