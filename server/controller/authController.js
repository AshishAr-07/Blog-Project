import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserSchema from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
const secretkey = "your_secret_key";

export const userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  try {
    const userExist = await UserSchema.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await UserSchema({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({success:true, message: "User registered successfully" });
    } else {
      return res.status(400).json({success:false, error: "User registration failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: true, message: "Invalid email or password" });
    }
    //
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, secretkey, { expiresIn: "1d" });
    console.log(token);

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};


// All USers
export const getAlllUSers = async (req,res) => {
  try {
    const users = await UserSchema.find({}).select("-password");
    res.status(200).json({success:true,users});
  } catch (error) {
    console.log(error)
  }
}

// Delete User
export const deleteUser = async (req,res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    else {
      return res.status(200).json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in deleting user" });
  }
}