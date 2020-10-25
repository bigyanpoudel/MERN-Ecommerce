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
});

export const deleteProduct = asyncHandler(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
       res.status(404);
       throw new Error('Product not found');
    }
    await product.remove();
    res.json({message: 'product delete success'});
});

export const createProduct = asyncHandler(async(req,res,next)=>{
    const product = new Product({
        name:'name',
        price: 0,
        user: req.user._id,
        image:'/images/default.jpg',
        brand:'brand',
        category:'category',
        countInStock:0,
        numReviews: 0,
        description:'description'
    })
    const productCreated = await product.save();
    res.json(productCreated);
});

export const updateProduct = asyncHandler(async(req,res,next)=>{
   const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true});
   if(product)
   {
       res.json(product);
   }else{
       res.status(400);
       throw new Error('cannot be updated');
   }
});


export const productReview = asyncHandler(async(req,res)=>{
    const {rating, comment} = req.body;
    const product = await findById(req.params.id);
    if(product)
    {
        const isReviewed = product.reviews.find(r=> r.user.toString()=== req.user._id.toString())
        if(isReviewed)
        {
            res.json(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.body.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,r)=> acc + r.rating,0) / product.numReviews;
        await product.save();
        res.json({message: 'reviewed added'});
    }
})