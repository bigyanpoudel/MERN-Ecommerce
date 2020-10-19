import express from 'express';

const router = express.Router();
import {login,register,profile,getAllUser} from '../controller/userController.js';

import protect from '../middleware/auth.js';
import {admin} from '../middleware/auth.js';

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/').get(protect,admin,getAllUser);
router.route('/profile').get(protect,profile)


export default router;