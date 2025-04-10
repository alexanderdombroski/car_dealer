import { Router } from 'express';
import { accountController, accountEmailController } from '../controllers/account/index.js';
import { loginHandlerController, loginPageController, logoutController} from '../controllers/account/login.js';
import { registerHandlerController, registerPageController } from '../controllers/account/register.js';
import { requireAdminPrivilages, requireLogin } from '../middleware/scoped/requireAuth.js';
import { accountDeleteController, accountManagePageController, accountPermissionController } from '../controllers/account/manage.js';

const router = Router();

// Account Routes
router.get('/', requireLogin, accountController);
router.patch('/', requireLogin, accountEmailController);

// Login Routes
router.get('/login', loginPageController);
router.post('/login', loginHandlerController);
router.get('/logout', requireLogin, logoutController);

// Register Routes
router.get('/register', registerPageController);
router.post('/register', registerHandlerController);

// Manage Route
router.get('/manage', requireAdminPrivilages, accountManagePageController);
router.patch('/manage/:id', requireAdminPrivilages, accountPermissionController);
router.delete('/manage/:id', requireAdminPrivilages, accountDeleteController);

export default router;