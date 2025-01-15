import mongoose from "mongoose";

const How_workSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  content: {
    type: "string",
    required: true,
  },

  card_title1: {
    type: "String",
    required: true,
  },
  card_content1: {
    type: "String",
    required: true,
  },

  card_title2: {
    type: "String",
    required: true,
  },
  card_content2: {
    type: "String",
    required: true,
  },

  card_title3: {
    type: "String",
    required: true,
  },
  card_content3: {
    type: "String",
    required: true,
  },

  video_title: {
    type: "String",
    required: true,
  },

  video_para: {
    type: "String",
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const How_work = mongoose.model("howwork_Page", How_workSchema);
export default How_work;
