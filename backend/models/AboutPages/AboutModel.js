import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  Banner: {
    type: "string",
    required: true,
  },

  Banner_title: {
    type: "string",
    required: true,
  },
  Banner_content: {
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
});

const About = mongoose.model("about_page", AboutSchema);
export default About;
