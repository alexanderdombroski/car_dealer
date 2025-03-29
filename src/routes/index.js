import { Router } from 'express';
import { homeController } from '../controllers/index.js';

const router = Router();
 
// The home page route
router.get('/', homeController);

export default router;