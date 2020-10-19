import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import {loginValidation} from '../validation/login.js';
export const  login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    console.log(req.body)
    const user = await User.findOne({email:email});
    if(!user)
    {
        res.status(404);
        throw new Error('User nor registered');
    }
    const isMatch = await user.matchPassword(password);
    console.log(isMatch)
    if(user && isMatch)
    {
        const token = await user.getJwtToken();
        res.json({_id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token});
    }else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

export const register =asyncHandler(async(req,res,next)=>{
    const {email,name,password,isAdmin} = req.body;
    const isUser = await User.findOne({email:email});
    if(isUser)
    {
        res.status(400);
        throw new Error('User already registered');
    }
    const user = await User.create({
        email,
        name,
        password,
        isAdmin
    });
    res.json(user);

})



export const profile = asyncHandler(async(req,res,next)=>{
    console.log(req.user);
    res.json(req.user);
});

//@access private/admin
export const getAllUser = asyncHandler(async(req,res,next)=>{
    const user = await User.find();
    res.json(user)
});