import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {users} from './data/users.js';
import products from './data/products.js';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

import {connectDB} from './config/db.js';

dotenv.config({
    path:'config/config.env'
});

connectDB();

const importData = async()=>{
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const createProducts = await products.map(product=>{
            return {
                ...product,
                user:adminUser
            }
        }) ;
        await Product.insertMany(createProducts);
        console.log("data imported");
        process.exit();
    }catch(err){
        console.log(`error in import  seeder ${err}`);
        process.exit(1);
    }
}

const destroyData = async()=>{
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log("data is destroy");
        process.exit();
    }catch(err){
        console.log(`error in destroy seeder ${err}`);
        process.exit(1);
    }
}
if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}