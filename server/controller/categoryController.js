import slugify from "slugify";
import CategorySchema from "../models/CategorySchema.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category is Required" });
    }
    const existingCategory = await CategorySchema.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const category = await new CategorySchema({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategorySchema.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Category",
      error,
    });
  }
};

// Single Category Controller
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategorySchema.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      message: "Category Fetched Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Single Category",
      error,
    });
  }
};

// Get All Categories
export const allCategoryController = async (req, res) => {
  try {
    const category = await CategorySchema.find({});
    res.status(200).send({
      success: true,
      message: "All Categories Fetched Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching All Categories",
      error,
    });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategorySchema.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Category",
      error,
    });
  }
};
