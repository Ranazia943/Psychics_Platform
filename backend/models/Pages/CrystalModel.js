import mongoose from "mongoose";

const CrystalPageSchema = new mongoose.Schema({
  CrystalBanner: {
    type: "string",
  },
  video: {
    type: String,
    required: true,
  },
  videoPara: {
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

const Crystal = mongoose.model('CrystalPage', CrystalPageSchema);
export default Crystal;
