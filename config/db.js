import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("MONGODB_URL", process.env.MONGODB_URL);
  const conn = await mongoose.connect(
    //  "mongodb+srv://bigyanpoudel:hello321@cluster0.ak2bu.azure.mongodb.net/ecommerce?retryWrites=true&w=majority",
    process.env.MONGODB_URL,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(
    `mongodb server is running at ${conn.connection.host} ${conn.connection.port}`
  );
};
