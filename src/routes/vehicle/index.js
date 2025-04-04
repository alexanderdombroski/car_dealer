import { Router } from 'express';

import reviewRouter from './review.js';
import inquiryRouter from './inquiry.js';
import { vehicleDeletionController, vehicleDetailsPageController, vehicleDetailsUpdateController, vehiclesPageController } from '../../controllers/vehicle/index.js';
import { vehicleUploadController, vehicleUploadPageController } from '../../controllers/vehicle/new.js';

import { requireAdminPrivilages, requireEmployeePrivilages, requireLogin } from '../../middleware/scoped/requireAuth.js';

const router = Router();
 
// Vehicle Listings
router.get('/', vehiclesPageController);
router.get('/type/:id', vehiclesPageController)

// Upload new Vehicle
router.get('/new', requireAdminPrivilages, vehicleUploadPageController);
router.post('/new', requireAdminPrivilages, vehicleUploadController);

// Vehicle Details
router.get('/:id', vehicleDetailsPageController);
router.patch('/:id', requireEmployeePrivilages, vehicleDetailsUpdateController);
router.delete('/:id', requireAdminPrivilages, vehicleDeletionController);

// Vehicle Reviews
router.use('/:id/review', requireLogin, reviewRouter);
router.use('/:id/inquiry', requireLogin, inquiryRouter);

export default router;