import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  Blog_Banner:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title1: {
    type: String,
    required: true,
  },
  content1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
    required: true,
  },
  content3: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["love", "life", "study","relationship", "nature", "family", "astrology", "spirituality", "horoscopes", "soulmate", "mind", "career", "health", "tarot"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
