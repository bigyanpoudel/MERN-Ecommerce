import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
//@desc getting all products
//@route GET api/v1/products
//@access Public

export const getProducts = asyncHandler(async(req,res,next)=>{
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{};
    const pageSize= 10;
    const pageNumber = Number(req.query.pageNumber) || 1;
    console.log(keyword);
    const count = await Product.countDocuments({...keyword});
    console.log(count);
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (pageNumber -1));
    console.log('' + pageNumber + '' + Math.ceil(count/pageSize));
    res.json({products,pageNumber,pages:Math.ceil(count/pageSize)});

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
    const product = await Product.findById(req.params.id);
    console.log(comment);
    if(product)
    {
        const isReviewed = product.reviews.find(r=> r.user.toString()=== req.user._id.toString());
        console.log(isReviewed);
        if(isReviewed)
        {
            res.status(400);
            throw new Error('Product already reviewed');
        }
         console.log('not ');
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        console.log(product.reviews);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,r)=> acc + r.rating,0) / product.numReviews;
        await product.save();
        console.log(product);
        res.json({message: 'reviewed added'});
    }
})

export const getTopProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find().sort({rating: -1}).limit(3);
    res.status(200).json(products);
})