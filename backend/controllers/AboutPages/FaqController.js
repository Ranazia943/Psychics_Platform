import FAQ from "../../models/AboutPages/FaqModel.js";

// Fetch FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findOne();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing FAQ
// Update all FAQs
// Controller: Update all FAQs
export const updateFAQs = async (req, res) => {
  const { faqs } = req.body; // Expecting the whole array of FAQs

  try {
    // Ensure the FAQ document exists
    let faqDoc = await FAQ.findOne();
    if (!faqDoc) {
      // Create a new FAQ document if none exists
      faqDoc = new FAQ({ faqs });
    } else {
      // Update the existing document
      faqDoc.faqs = faqs;
    }

    const updatedFAQ = await faqDoc.save();
    res.status(200).json(updatedFAQ);
  } catch (error) {
    console.error("Error updating FAQs:", error);
    res.status(500).json({ message: error.message });
  }
};

