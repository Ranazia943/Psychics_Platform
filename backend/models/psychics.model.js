import mongoose from "mongoose";

const psychicsSchema = new mongoose.Schema(
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
    googleId: { type: String, default: null },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type:String,
      required:true,
    },
    role: {
      type: String,
      default: "Psychics",
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    phoneno: {
      type: String,
      required:true,
    },
    verified: {
      type: Boolean,
      default: false, // Default to unverified
    },
    status: {
      type: String,
      enum: ["online", "offline"], // Only allow "online" or "offline"
      default: "offline", // Default status is "offline"
    },
  },
  { timestamps: true }
);

const Psychics = mongoose.model("Psychics", psychicsSchema);

export default Psychics;
