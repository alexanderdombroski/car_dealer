import { Router } from 'express';
import { accountController } from '../controllers/account/index.js';
import { loginHandlerController, loginPageController } from '../controllers/account/login.js';
import { registerHandlerController, registerPageController } from '../controllers/account/register.js';

const router = Router();

// Account Routes
router.get('/', accountController);

// Login Routes
router.get('/login', loginPageController);
router.post('/login', loginHandlerController)

// Register Routes
router.get('/register', registerPageController)
router.post('/register', registerHandlerController)

export default router;