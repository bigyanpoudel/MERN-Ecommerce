import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
//env configuration
dotenv.config();

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(xss());
//importing routes
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import fileUploadRoute from "./routes/fileUpload.js";
app.use("/api/products", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/upload", fileUploadRoute);

app.get("/api/v1/config/paypal", (req, res) => {
  res.send(
    "AbpOOsa90K4GnjkxdTW9f4sb0t4cp5nAbn4hfUEhN9IAYDVWoJnZO08leQdVdhuxTVB9Brwju1i9OaQc"
  );
});



const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "wallmart/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "wallmart", "build", "index.html"));
  });
}
//import error
import { errorHandler, routeError } from "./middleware/errorHandler.js";
app.use(routeError);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
