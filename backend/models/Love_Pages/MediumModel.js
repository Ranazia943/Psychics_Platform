import mongoose from "mongoose";

const MediumSchema = new mongoose.Schema({
  MediumBanner: {
    type: "string",
  },
  MediumPara: {
    type: "String",
    required: true,
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

const Medium = mongoose.model("Medium_Page", MediumSchema);
export default Medium;
