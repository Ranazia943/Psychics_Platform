import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  faqs: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ; // Use export default with ES Modules
