import { Router } from 'express';
import { vehicleDetailsPageController, vehiclesPageController } from '../../controllers/vehicle/index.js';
import { requireLogin } from '../../middleware/scoped/requireAuth.js';

const router = Router();
 
// Vehicle Listings
router.get('/', vehiclesPageController);
router.get('/type/:id', vehiclesPageController)

// Vehicle Details
router.get('/:id', vehicleDetailsPageController);


export default router;