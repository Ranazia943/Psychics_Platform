import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  horoscopeBanner: {
    // Corrected the field name
    type: String,
  },
  intro_para: {
    type: String,
    required: true,
  },

  basic_price: {
    type: Number,
    required: true,
  },
  premium_price: {
    type: Number,
    required: true,
  },

  diamond_price: {
    type: Number,
    required: true,
  },

  list1: {
    type: [String],
    required: true,
  },
  list2: {
    type: [String],
    required: true,
  },
  list3: {
    type: [String],
    required: true,
  },

  last_para:{
    type: String,
    required: true,
  },
});

const Pricing = mongoose.model("Pricing_page", PricingSchema);

export default Pricing;
