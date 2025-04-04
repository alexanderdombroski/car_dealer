import { Router } from 'express';
import { vehicleDetailsPageController, vehiclesPageController } from '../../controllers/vehicle/index.js';
import { requireAdminPrivilages, requireLogin } from '../../middleware/scoped/requireAuth.js';
import reviewRouter from './review.js';
import inquiryRouter from './inquiry.js';
import { vehicleUploadController, vehicleUploadPageController } from '../../controllers/vehicle/new.js';

const router = Router();
 
// Vehicle Listings
router.get('/', vehiclesPageController);
router.get('/type/:id', vehiclesPageController)

// Upload new Vehicle
router.get('/new', requireAdminPrivilages, vehicleUploadPageController);
router.post('/new', requireAdminPrivilages, vehicleUploadController);

// Vehicle Details
router.get('/:id', vehicleDetailsPageController);

// Vehicle Reviews
router.use('/:id/review', requireLogin, reviewRouter);
router.use('/:id/inquiry', requireLogin, inquiryRouter);

export default router;