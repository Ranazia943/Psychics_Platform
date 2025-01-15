import mongoose from "mongoose";

const SaturnSchema = new mongoose.Schema({
  horoscopeBanner: {
    // Corrected the field name
    type: String,
  },
  daily_date: {
    type: String,
    required: true,
  },
  daily_para: {
    type: String,
    required: true,
  },
  weekly_date: {
    type: String,
    required: true,
  },
  weekly_heading: {
    type: String,
    required: true,
  },
  weekly_para: {
    type: String,
    required: true,
  },
  monthly_date: {
    type: String,
    required: true,
  },
  monthly_para: {
    type: String,
    required: true,
  },
  y_heading: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  generalOverview: {
    type: String,
    required: true,
  },
  whatToLookForwardTo: {
    type: [String],
    required: true,
  },
  whatToWatchOutFor: {
    type: [String],
    required: true,
  },
  lovePredictions: {
    type: String,
    required: true,
  },
  importantDates: {
    type: String,
    required: true,
  },
  h2: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  video: {
    type: String, // URL to the video stored in Cloudinary or another source
    required: true,
  },
});

const Saturn = mongoose.model("Saturn", SaturnSchema);

export default Saturn;
