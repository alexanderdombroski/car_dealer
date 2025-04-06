import { Router } from 'express';
import { homeController } from '../controllers/index.js';
import { inquiryManagePageController } from '../controllers/inquiry.js';
import { requireEmployeePrivilages } from '../middleware/scoped/requireAuth.js';

const router = Router();
 
// The home page route
router.get('/', homeController);
router.get('/inquiry', requireEmployeePrivilages, inquiryManagePageController);

export default router;