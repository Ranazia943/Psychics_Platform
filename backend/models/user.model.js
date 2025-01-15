import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: { type: String, enum: ['user', 'admin', 'User', 'Admin'], default: 'user' },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    walletBalance: {
      type: Number,
      default: 0, // Default wallet balance is 0 for new users
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
