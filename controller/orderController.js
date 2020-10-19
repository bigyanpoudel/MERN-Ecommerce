import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import mongoose from 'mongoose';
export const addOrder = asyncHandler(async(req,res,next)=>{
    const {orderItems,shippingAddress,paymentMethod,taxPrice,itemsPrice,shippingPrice,totalPrice} = req.body;
    if(orderItems && orderItems.length === 0)
    {
        res.status(400);
        throw new Error("No order Items")
    }else{
        const order = new Order({
            orderItems,
            user:req.user,
            shippingAddress,
            shippingPrice,
            totalPrice,
            taxPrice,
            itemsPrice,
            paymentMethod
        });
       const orderCreated = await  order.save();
        res.json(orderCreated);
    }
});

export const getOrderItem = asyncHandler(async(req,res,next)=>{
    const orderItem = await Order.findById(req.params.id).populate('user','name email');
    if(!orderItem)
    {
        res.status(400);
        throw new Error('No order found');
    }
    res.json(orderItem);
})

export const updateOrderPayment = asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    console.log(req.body);
    if(!order)
    {
        res.status(400);
        throw new Error('No order found');
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult={
        id: req.body.id,
        status: req.body.status,
        updated_time:req.body.updated_time,
        email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
   
})

export const getMyOrders = async(req,res,next)=>{
 const orders = await Order.find({user: req.user._id});
 res.json(orders);
}