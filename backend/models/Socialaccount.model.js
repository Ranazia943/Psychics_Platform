// models/SocialMedia.js
import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    facebook: { type: String, required: false, match: /^(https?:\/\/)?(www\.)?(facebook\.com)\/.*/ },
    instagram: { type: String, required: false, match: /^(https?:\/\/)?(www\.)?(instagram\.com)\/.*/ },
    twitter: { type: String, required: false, match: /^(https?:\/\/)?(www\.)?(twitter\.com)\/.*/ },
    linkedin: { type: String, required: false, match: /^(https?:\/\/)?(www\.)?(linkedin\.com)\/.*/ },
    youtube: { type: String, required: false, match: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*/ },
  },
  { timestamps: true }
);

export default mongoose.model('SocialMedia', SocialMediaSchema);
