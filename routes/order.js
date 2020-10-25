import  express from 'express';

const router = express.Router();

import {addOrder,getOrderItem,updateOrderPayment,getMyOrders,getAllOrders,putOrderDeliver} from '../controller/orderController.js';
import protect from '../middleware/auth.js';
import {admin} from '../middleware/auth.js';
router.route('/all').get(protect,admin,getAllOrders)
router.route('/').post(protect,addOrder);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderItem);
router.route('/:id/pay').put(protect,updateOrderPayment);
router.route('/:id/deliver').put(protect,admin,putOrderDeliver);



export default router;