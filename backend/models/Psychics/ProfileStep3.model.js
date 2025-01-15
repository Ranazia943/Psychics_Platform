import mongoose from "mongoose";

const ProfileStep3Schema = new mongoose.Schema(
  {
    psychicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Psychics",
      required: true,
    },
    businessSource: {
      type: String,
      required: true,
      enum: [
        "Own Business",
        "Private Job",
        "Government Job",
        "Studying in College",
        "None of the Above",
      ],
    },
    qualification: {
      type: String,
      required: true,
      enum: [
        "Diploma", "10th", "12th", "Graduated", "Post Graduated", "PhD", "Others"
      ],
    },
    degreeDiploma: {
      type: String,
      required: true,
      enum: [
        "B.Tech", "B.Sc", "B.A", "B.E", "B.Com", "B.Pharma", "M.A", "M.Sc", "MBBS", "Others"
      ],
    },
    
    collegeName: {
      type: String,
      required: true,
    },
    learnedAstrologyFrom: {
      type: String,
      required: true,
    },
    instagramProfile: String,
    facebookProfile: String,
    linkedInProfile: String,
    youtubeProfile: String,
    websiteProfile: String,
   
  },
  { timestamps: true }
);

const ProfileStep3 = mongoose.model("ProfileStep3", ProfileStep3Schema);

export default ProfileStep3;
