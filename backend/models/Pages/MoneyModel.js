import mongoose from "mongoose";

const MoneyPageSchema = new mongoose.Schema({
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

const Money_Psychics = mongoose.model("Money_Psychics", MoneyPageSchema);
export default Money_Psychics;
