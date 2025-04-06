import { Router } from 'express';
import { inquiryDeleteController, inquiryHandlerController, inquiryPageController, inquiryUpdateController } from '../../controllers/inquiry.js';
import { requireEmployeePrivilages } from '../../middleware/scoped/requireAuth.js';

const router = Router({ mergeParams: true });

// Vehicle Inquiry Routes
router.get('/', inquiryPageController);
router.post('/', inquiryHandlerController);
router.patch('/:iid', requireEmployeePrivilages, inquiryUpdateController);
router.delete('/:iid', requireEmployeePrivilages, inquiryDeleteController);

export default router;