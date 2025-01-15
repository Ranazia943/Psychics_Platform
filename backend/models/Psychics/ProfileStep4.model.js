import mongoose from "mongoose";

const ProfileStep4Schema = new mongoose.Schema(
  {
    psychicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Psychics",
      required: true,
    },
    minEarningExpectation: {
      type: Number,
      required: true,
    },
    maxEarningExpectation: {
      type: Number,
      required: true,
    },
    countriesTraveled: {
      type: String,
      required: true,
      enum: ["0", "1-2", "3-5", "6+"],
    },
    currentJobStatus: {
      type: String,
      required: true,
      enum: [
        "No, I am working as part timer or freelancer",
        "Yes, I am working somewhere as full time",
        "No, I am not working somewhere else",
        "I own a business",
      ],
    },
    longBio: {
      type: String,
      required: true,
    },
    qualitiesOfPsychic: {
      type: String,
      required: true,
    },
    biggestChallenge: {
      type: String,
      required: true,
    },
    repeatedQuestionHandling: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfileStep4 = mongoose.model("ProfileStep4", ProfileStep4Schema);

export default ProfileStep4;
