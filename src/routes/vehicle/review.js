import { Router } from 'express';
import { reviewCreationController, reviewDeleteController, reviewEditController } from '../../controllers/vehicle/review.js';
import authorizeReviewAction from '../../middleware/scoped/reviewAuthorization.js';

const router = Router({ mergeParams: true });

// Vehicle Reviews Routes
router.post('/', reviewCreationController);
router.put('/:rid', authorizeReviewAction, reviewEditController);
router.delete('/:rid', authorizeReviewAction, reviewDeleteController); 

export default router;