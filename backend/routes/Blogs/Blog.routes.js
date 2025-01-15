// routes/blogRoutes.js
import express from "express";
import {
  createBlogPost,
  getBlogsByCategory,
  deleteBlogPost,
  likeBlogPost,
  getBlogById,
  getCategoryNames,
} from "../../controllers/Blogs/BlogController.js";

const router = express.Router();

// Route to add a new blog post
router.post("/add-post", createBlogPost);
router.get("/categories", getCategoryNames); // Add the new route for fetching category names

// Route to fetch blog posts by category
router.get("/posts/:category", getBlogsByCategory);
router.get("/blog/post/:id" , getBlogById)
// Route to delete a blog post by ID
router.delete("/blog/posts/:id", deleteBlogPost);

router.post("/posts/:id/like", likeBlogPost);

export default router;
