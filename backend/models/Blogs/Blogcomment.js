import mongoose from "mongoose";

// Define the Comment Schema
const CommentSchema = new mongoose.Schema({
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String, // Change this to String instead of ObjectId
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
// Pre-save middleware to automatically fetch blog category
CommentSchema.pre("save", async function (next) {
  if (!this.category) {
    const blogPost = await mongoose.model("BlogPost").findById(this.blogPost);
    if (blogPost) {
      this.category = blogPost.category; // Automatically inherit category from the blog post
    }
  }
  next();
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
