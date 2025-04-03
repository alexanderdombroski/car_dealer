import { Router } from 'express';
import { inquiryHandlerController, inquiryPageController } from '../../controllers/vehicle/inquiry.js';

const router = Router({ mergeParams: true });

// Vehicle Reviews Routes
router.get('/', inquiryPageController);
router.post('/', inquiryHandlerController);
// router.put('/:rid', authorizeReviewAction, reviewEditController);
// router.delete('/:rid', authorizeReviewAction, reviewDeleteController); 

export default router;