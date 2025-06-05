import slugify from "slugify";
import BlogSchema from "../models/BlogSchema.js";
import fs from "fs";

export const createBlogController = async (req, res) => {
  try {
    const { title, shortdescription, description, category } = req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !title:
        return res.status(400).json({ error: "Title is required" });
      case !shortdescription:
        return res.status(400).json({ error: "Short description is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !image:
        return res.status(400).json({ error: "Image is required" });
    }

    const blog = new BlogSchema({
      ...req.files,
      ...req.fields,
      slug: slugify(title),
    });
    if (image) {
      blog.image.data = fs.readFileSync(image.path);
      blog.image.contentType = image.type;
    }
    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating blog",
      error,
    });
  }
};

// Get All Blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await BlogSchema.find({})
      .populate("category")
      .select("-image")
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      counTotal: blogs.length,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting blogs",
      error,
    });
  }
};

// Get Single Blog
export const getSingleBlogController = async (req, res) => {
  try {
    const blog = await BlogSchema.findOne({ slug: req.params.slug }).populate(
      "category"
    );
    res.status(200).json({
      success: true,
      message: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting single blog",
      error,
    });
  }
};

// Delete Blog Controller
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting blog",
      error,
    });
  }
};

// Update Blog Controller 
export const updateBlogController = async (req, res) => {
  try {
    const { title, shortdescription, description, category } = req.fields;
    const { image } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(400).json({ error: "Title is required" });
      case !shortdescription:
        return res.status(400).json({ error: "Short description is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !image:
        return res.status(400).json({ error: "Image is required" });
    }
    const blog = await BlogSchema.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        ...req.files,
        slug: slugify(title),
      },
      { new: true }
    );

    if (image) {
      blog.image.data = fs.readFileSync(image.path);
      blog.image.contentType = image.type;
    }
    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Blog",
      error,
    });
  }
};
