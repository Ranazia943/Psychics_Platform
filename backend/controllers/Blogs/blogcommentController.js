import Comment from "../../models/Blogs/Blogcomment.js";  // Import the Comment model
import BlogPost from "../../models/Blogs/BlogModel.js"; // Import the BlogPost model


// Add a comment with the associated blog post category
export const addComment = async (req, res) => {
  const { blogPostId, name, email, content, category } = req.body;

  try {
    // Check if the blog post exists
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Create a new comment and inherit the category from the blog post
    const newComment = new Comment({
      blogPost: blogPostId,
      name: name,
      email: email,
      content: content,
      category: category || blogPost.category, // Inherit the blog post's category if not provided
    });

    // Save the new comment to the database
    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};


// Fetch comments under a specific category
export const fetchCommentsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Fetch all comments with the given category ID
    const comments = await Comment.find({ category: categoryId })
      .populate("blogPost", "title"); // Optionally populate blog post title

    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found for this category" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};
// Import the Comment model

// Fetch all comments
export const fetchAllComments = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 comments

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch comments with pagination
    const comments = await Comment.find()
      .populate("blogPost", "title") // Populate blog post title if needed
      .skip(skip)
      .limit(limit);

    // Count total comments for pagination information
    const totalComments = await Comment.countDocuments();

    // Return comments along with pagination info
    res.status(200).json({
      comments,
      totalComments,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// Update a comment by ID
  export const updateCommentById = async (req, res) => {
    const { commentId } = req.params; // Get comment ID from request parameters
    const { name, email, content } = req.body; // Get updated data from request body

    try {
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Update the comment fields
      if (name) comment.name = name;
      if (email) comment.email = email;
      if (content) comment.content = content;

      // Save the updated comment to the database
      await comment.save();

      res.status(200).json({
        message: "Comment updated successfully",
        comment,
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ message: "Error updating comment", error: error.message });
    }
  };


export const deleteCommentById = async (req, res) => {
  const { commentId } = req.params; // Get comment ID from request parameters

  try {
    // Find and delete the comment by ID
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
