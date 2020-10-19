import  express from 'express';

const router = express.Router();

import {addOrder,getOrderItem,updateOrderPayment,getMyOrders} from '../controller/orderController.js';
import protect from '../middleware/auth.js';
router.route('/').post(protect,addOrder);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderItem);
router.route('/:id/pay').put(protect,updateOrderPayment);



export default router;