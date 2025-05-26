import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortdescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
   category: {
      type: mongoose.ObjectId, 
      ref: "category",
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blogs", blogSchema);
