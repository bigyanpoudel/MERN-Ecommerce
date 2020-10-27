import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    user:{
         type: String,
        required: true 
    }
},{
    timestamps: true
});
const ProductSchema = new mongoose.Schema({
 user:{
     type: mongoose.Schema.Types.ObjectId,
     required:true,
     ref: 'User'
 },
 name:{
     type: String,
     required: true
 },
 image:{
    type: String,
    required: true
},
brand:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true,
    default:0
},
rating:{
    type: Number,
    required: true,
    default: 0
},
numReviews:{
    type: Number,
    required: true,
    default: 0
},
countInStock:{
    type: Number,
    required: true,
    default: 0
},
category:{
    type: String,
    required: true
},
reviews: [ReviewSchema]
},{
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;