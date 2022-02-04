import User from "../models/User.js";
import asyncHandler from "express-async-handler";
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  console.log("user", user);
  if (!user) {
    res.status(404);
    throw new Error("User nor registered");
  }
  const isMatch = await user.matchPassword(password);
  if (user && isMatch) {
    const token = await user.getJwtToken();
    res
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const register = asyncHandler(async (req, res, next) => {
  const { email, name, password, isAdmin } = req.body;
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    res.status(400);
    throw new Error("User already registered");
  }
  const user = await User.create({
    email,
    name,
    password,
    isAdmin,
  });
  res.status(200).json(user);
});

export const profile = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

//@access private/admin
export const getAllUser = asyncHandler(async (req, res, next) => {
  const user = await User.find().sort("createdAt");
  res.status(200).json(user);
});

//@access private/admin
export const deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User delete success" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

export const updateUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  console.log(req.body);
  user.email = req.body.email || user.email;
  user.name = req.body.name || user.email;
  user.isAdmin = req.body.isAdmin;
  const createdUser = await user.save();
  if (createdUser) {
    res.status(200).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  }
});
