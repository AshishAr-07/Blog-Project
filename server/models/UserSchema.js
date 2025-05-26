import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["admin", "blogger", "Editor",],
        default: "blogger",
    }
},{timestamps: true});


export default mongoose.model("User", UserSchema);