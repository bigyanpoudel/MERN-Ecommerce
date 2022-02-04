import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  const res = await bcrypt.compare(enteredPassword, this.password);
  console.log("res", res);
  return res;
};
UserSchema.methods.getJwtToken = async function () {
  console.log("token");
  const token = jwt.sign(
    { id: this._id },
    "aksjiewu87264219sndh3t801bx6rt7awj763e920hcjbsuy48",
    {
      expiresIn: "30d",
    }
  );
  console.log("token", token);
  return token;
};
const User = mongoose.model("User", UserSchema);
export default User;
