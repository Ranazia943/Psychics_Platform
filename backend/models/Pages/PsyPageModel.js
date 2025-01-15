import mongoose from "mongoose";

const PsyPageSchema = new mongoose.Schema({
  welcomeImage: {
    type: "string",
  },
  expert: {
    type: "String",
    required: true,
  },

  NewCustomerOffer: {
    type: String,
    required: true,
  },
  basic: {
    type: String,
    required: true,
  },
  premium: {
    type: String,
    required: true,
  },

  advance: {
    type: String,
    required: true,
  },

  basic_list: {
    type: [String],
    required: true,
  },

  premium_list: {
    type: [String],
    required: true,
  },

  advance_list: {
    type: [String],
    required: true,
  },
  titlewhytalk: {
    type: String,
    required: true,
  },
  experiences: [
    {
      experienceTitle: {
        type: String,
        required: true,
      },
      experienceDescription: {
        type: String,
        required: true,
      },
      experienceImage: {
        type: String, // URL of the image
        required: true,
      },
    },
  ],

  bannerImage: {
    type: String, // URL of the banner image
    required: true,
  },
  discountText: {
    type: String,
    required: true,
  },
  paragraphText: {
    type: String,
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

  endtitle: {
    type: String,
    required: true,
  },
  enddescription: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PsyPage = mongoose.model("PsyPage", PsyPageSchema);
export default PsyPage;
