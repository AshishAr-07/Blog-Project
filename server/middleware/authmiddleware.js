import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";
const secretkey = "your_secret_key";
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, secretkey);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized access - Invalid token",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.user?._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
