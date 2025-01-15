import mongoose from "mongoose";

const CheatingSchema = new mongoose.Schema({
  MediumBanner: {
    type: "string",
  },
  
  video: {
    type: String,
    required: true,
  },

  video_para: {
    type: "String",
    required: true,
  },

  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Cheating = mongoose.model("Cheating", CheatingSchema);
export default Cheating;
