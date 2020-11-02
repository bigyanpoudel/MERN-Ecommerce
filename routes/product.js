import express from 'express';

const router = express.Router();

import {getProducts,getProduct,deleteProduct,
    createProduct,updateProduct,productReview,getTopProducts} from '../controller/productController.js';
import {admin} from '../middleware/auth.js';
import protect from '../middleware/auth.js';
router.route('/top').get(getTopProducts);
router.route('/:id/review').put(protect,productReview);
router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProduct).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct);





export default router;