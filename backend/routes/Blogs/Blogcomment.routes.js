import express from "express";
import { addComment, deleteCommentById, fetchAllComments, fetchCommentsByCategory, updateCommentById } from "../../controllers/Blogs/blogcommentController.js";

const router = express.Router();

// Route to add a comment
router.post("/addComment", addComment);

// Route to fetch comments by category ID
router.get("/category/:categoryId", fetchCommentsByCategory);
router.get("/allcomment", fetchAllComments);

// Update a comment by ID
router.put("/update/:commentId", updateCommentById);
router.delete('/delete/:commentId', deleteCommentById);

export default router;
