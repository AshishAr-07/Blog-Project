import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authmiddleware.js';
import { createBlogController, deleteBlogController, getAllBlogsController, getSingleBlogController, updateBlogController } from '../controller/blogController.js';
import formidable from 'express-formidable';

var router = express.Router();

router.post("/create-blog", requireSignIn,formidable({
    maxFieldsSize: 10 * 1024 * 1024, // 10 MB
    maxFiles: 1,
}), createBlogController);

router.get("/allblog", getAllBlogsController);
router.get("/singleblog/:slug", requireSignIn, isAdmin, getSingleBlogController);
router.delete("/deleteblog/:id", requireSignIn, isAdmin, deleteBlogController);
router.put("/updateblog/:id" , requireSignIn,isAdmin,formidable(),updateBlogController)

export default router;