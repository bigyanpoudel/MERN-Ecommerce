import express from 'express';

const router = express.Router();

import {getProducts,getProduct} from '../controller/productController.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);




export default router;