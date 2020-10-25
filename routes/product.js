import express from 'express';

const router = express.Router();

import {getProducts,getProduct,deleteProduct,createProduct,updateProduct,productReview} from '../controller/productController.js';
import {admin} from '../middleware/auth.js';
import protect from '../middleware/auth.js';
router.route('/').get(getProducts).post(protect,admin,createProduct);

router.route('/:id').get(getProduct).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct);
router.route(':/id/review').put(protect,admin,productReview);




export default router;