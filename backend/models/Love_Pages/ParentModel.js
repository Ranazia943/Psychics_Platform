import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
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

const Parent = mongoose.model("Parent_Page", ParentSchema);
export default Parent;
