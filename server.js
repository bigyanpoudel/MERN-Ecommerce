import express from 'express';
import  dotenv, {config } from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
//env configuration
dotenv.config({
    path:'./config/config.env'
});

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
  
    next(); // call next middlewer in line
  });
//importing routes
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
app.use('/api/products',productRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1/order',orderRoutes);

app.get('/api/v1/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID);
})
//import error
import {errorHandler,routeError} from './middleware/errorHandler.js';
app.use(routeError);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})