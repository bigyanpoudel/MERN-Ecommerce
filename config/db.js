import mongoose from 'mongoose';


export const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URL,{useCreateIndex:true,
    useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true});
    
    console.log(`mongodb server is running at ${conn.connection.host} ${conn.connection.port}`);
}