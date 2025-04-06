import { Router } from 'express';
import { repairManagementPageController, repairRequestHandlerController, repairStatusController } from '../controllers/repair.js';
import { requireEmployeePrivilages } from '../middleware/scoped/requireAuth.js';

const router = Router();

router.get('/', requireEmployeePrivilages, repairManagementPageController);
router.post('/', repairRequestHandlerController);
router.patch('/:id', requireEmployeePrivilages, repairStatusController);

export default router;