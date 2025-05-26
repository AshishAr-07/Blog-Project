import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();
//
router.post("/create-category", requireSignIn, createCategoryController);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/single-category/:slug", requireSignIn, singleCategoryController);

router.get("/getcategory", requireSignIn, allCategoryController);

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
