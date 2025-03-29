import { Router } from 'express';
import { accountController } from '../controllers/account/index.js';
import { loginHandlerController, loginPageController } from '../controllers/account/login.js';

const router = Router();

// Account Routes
router.get('/', accountController);

// Login Routes
router.get('/login', loginPageController);
router.post('/login', loginHandlerController)


export default router;