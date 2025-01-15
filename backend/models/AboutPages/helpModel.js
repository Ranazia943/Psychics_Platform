import mongoose from "mongoose";

const HelpSchema = new mongoose.Schema({
  Banner: {
    type: "string",
    required: true,
  },

  title1: {
    type: "string",
    required: true,
  },
  content1: {
    type: "string",
    required: true,
  },

  title2: {
    type: "string",
    required: true,
  },
  content2: {
    type: "string",
    required: true,
  },

  image_title: {
    type: "String",
    required: true,
  },

  image_para: {
    type: "String",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  image_title1: {
    type: "String",
    required: true,
  },

  image_para1: {
    type: "String",
    required: true,
  },
  image1: {
    type: String,
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

  
});

const Help = mongoose.model("help_page", HelpSchema);
export default Help;
