import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
//@desc getting all products
//@route GET api/v1/products
//@access Public

export const getProducts = asyncHandler(async(req,res,next)=>{
    const products = await Product.find();
    res.json(products);
});

export const getProduct = asyncHandler(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
       res.status(404);
       throw new Error('Product not found');
    }
    res.json({product});
})