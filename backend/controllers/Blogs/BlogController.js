// controllers/blogController.js

import BlogPost from "../../models/Blogs/BlogModel.js";

// Create a new blog post
export const createBlogPost = async (req, res) => {
  const {
    Blog_Banner,
    title,
    content,
    title1,
    content1,
    title2,
    content2,
    title3,
    content3,
    image,
    category,
  } = req.body;

  console.log("Received data:", {
    Blog_Banner,
    title,
    content,
    title1,
    content1,
    title2,
    content2,
    title3,
    content3,
    image,
    category,
  });

  try {
    const newPost = new BlogPost({
      Blog_Banner,
      title,
      content,
      title1,
      content1,
      title2,
      content2,
      title3,
      content3,
      image,
      category,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};
// Fetch a blog post by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error });
  }
};

export const getCategoryNames = async (req, res) => {
  try {
    const categories = await BlogPost.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};
// Fetch blog posts by category
export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogs = await BlogPost.find({ category });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

export const likeBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Assume you are sending the userId in the request

  try {
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const hasLiked = blog.likedBy.includes(userId);

    if (hasLiked) {
      // Remove the like
      blog.likes -= 1;
      blog.likedBy = blog.likedBy.filter((user) => user !== userId);
    } else {
      // Add the like
      blog.likes += 1;
      blog.likedBy.push(userId);
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to like post", error });
  }
};

// Delete a blog post by ID
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};
