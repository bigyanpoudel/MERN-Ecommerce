import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.decode(
        token,
        "aksjiewu87264219sndh3t801bx6rt7awj763e920hcjbsuy48"
      );

      req.user = await User.findById({ _id: decode.id }).select("-password");
      console.log(req.user);
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized, token has been expired o failed");
    }
  }
  if (!token) {
    res.status("401");
    throw new Error("Access not authorized");
  }
  next();
});
export default protect;

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};
