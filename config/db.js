import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(
    // "mongodb+srv://bgyaan123:iamur321@cluster0.99q7m.mongodb.net/ecommerce?retryWrites=true&w=majority",
    "mongodb://localhost:27017/fashion",
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
