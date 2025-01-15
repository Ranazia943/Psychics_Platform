import mongoose from "mongoose";

const RuneSchema = new mongoose.Schema({
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

const Rune = mongoose.model("Rune", RuneSchema);
export default Rune;
