import { Router } from 'express';
import { vehicleDetailsPageController, vehiclesPageController } from '../controllers/vehicle/index.js';

const router = Router();
 
// Vehicle Listings
router.get('/', vehiclesPageController);

// Vehicle Details
router.get('/details/:id', vehicleDetailsPageController);



export default router;