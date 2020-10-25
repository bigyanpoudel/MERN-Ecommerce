import express from 'express';

const router = express.Router();
import {login,
    register,
    profile,
    getAllUser,
    deleteUserById,
    getUserById,
    updateUserInfo} from '../controller/userController.js';

import protect from '../middleware/auth.js';
import {admin} from '../middleware/auth.js';

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/profile').get(protect,profile)
router.route('/').get(protect,admin,getAllUser);
router.route('/:id').delete(protect,admin,deleteUserById).get(protect,admin,getUserById).put(protect,admin,updateUserInfo);



export default router;