import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import mongoose from 'mongoose';
//@desc adding order
//@route POST api/v1/order
//@access  private
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
        res.stats(200).json(orderCreated);
    }
});

//@desc getting order item
//@route GET api/v1/order/:id
//@access  private
export const getOrderItem = asyncHandler(async(req,res,next)=>{
    const orderItem = await Order.findById(req.params.id).populate('user','name email');
    if(!orderItem)
    {
        res.status(400);
        throw new Error('No order found');
    }
    res.status(200).json(orderItem);
})

//@desc updating order pay
//@route PUT api/v1/order/:id/pay
//@access  private

export const updateOrderPayment = asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
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
    res.status(200).json(updatedOrder);
   
})

export const getMyOrders = asyncHandler(async(req,res,next)=>{
 const orders = await Order.find({user: req.user._id});
 res.status(200).json(orders);
})

export const getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find({}).populate('user','id name');
    if(!orders)
    {
        res.status(401);
        throw new Error('no order');
    }
    res.stats(200).json(orders);
})

export const putOrderDeliver= asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(order)
    {
        order.isDelivered = true,
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }

})