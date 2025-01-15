import mongoose from "mongoose";

const LovePageSchema = new mongoose.Schema({

    Love_Banner: {
        type: String,
        required: true,
    },

  fallInLoveIntro: {
    type: String,
    required: true,
  },
  fallInLoveImage: {
    type: String, 
    required: true,
  },
  fallInLoveParagraph: {
    type: String, 
    required: true,
  },
  fallInLoveList: {
    type: [String], 
    required: true,
  },
  relationshipsIntro: {
    type: String, 
    required: true,
  },
  relationshipsList: {
    type: [String],
    required: true,
  },
  relationshipsImage: {
    type: String, 
    required: true,
  },
  videoUrl: {
    type: String, 
    required: true,
  },
  videoDescription: {
    type: String, 
    required: true,
  },
  loveGuideIntro: {
    type: String, 
    required: true,
  },
  loveGuideParagraph: {
    type: String, 
    required: true,
  },
  loveGuideList: {
    type: [String], 
    required: true,
  },
});

const LovePage = mongoose.model("LovePage", LovePageSchema);
export default LovePage;
