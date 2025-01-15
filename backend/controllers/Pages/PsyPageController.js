import PsyPage from "../../models/Pages/PsyPageModel.js";

const createPsyPage = async (req, res) => {
  const {
    welcomeImage,
    expert,
    NewCustomerOffer,
    basic,
    premium,
    advance,
    basic_list,
    premium_list,
    advance_list,
    titlewhytalk,
    experiences,
    bannerImage,
    discountText,
    paragraphText,
    question,
    answer,
    endtitle,
    enddescription,
    videoUrl,
  } = req.body;

  try {
    // Log the request body for debugging
    console.log("Creating PsyPage with data:", req.body);

    const newPsyPage = new PsyPage({
      welcomeImage,
      expert,
      NewCustomerOffer,
      basic,
      premium,
      advance,
      basic_list,
      premium_list,
      advance_list,
      titlewhytalk,
      experiences,
      bannerImage,
      discountText,
      paragraphText,
      question,
      answer,
      endtitle,
      enddescription,
      videoUrl,
    });

    const savePsyPage = await newPsyPage.save();
    res.status(201).json(savePsyPage);
  } catch (error) {
    console.error("Error creating PsyPage:", error);
    res.status(400).json({ message: error.message });
  }
};

const updatePsyPage = async (req, res) => {
  const {
    welcomeImage,
    expert,
    NewCustomerOffer,
    basic,
    premium,
    advance,
    basic_list,
    premium_list,
    advance_list,
    titlewhytalk,
    experiences,  // This should now be an array of objects
    bannerImage,
    discountText,
    paragraphText,
    question,
    answer,
    endtitle,
    enddescription,
    videoUrl,
  } = req.body;

  try {
    // Log the request body for debugging
    console.log("Updating PsyPage with data:", req.body);

    const updatedPsyPage = await PsyPage.findOneAndUpdate(
      {},  // Update by ID or some unique identifier if necessary
      {
        welcomeImage,
        expert,
        NewCustomerOffer,
        basic,
        premium,
        advance,
        basic_list,
        premium_list,
        advance_list,
        titlewhytalk,
        experiences, // This is now correctly formatted as an array of objects
        bannerImage,
        discountText,
        paragraphText,
        question,
        answer,
        endtitle,
        enddescription,
        videoUrl,
      },
      { new: true, upsert: true }
    );

    if (!updatedPsyPage) {
      return res.status(404).json({ message: "PsyPage not found" });
    }

    res.json(updatedPsyPage);
  } catch (error) {
    console.error("Error updating PsyPage:", error);
    res.status(400).json({ message: error.message });
  }
};


const getPsyPage = async (req, res) => {
  try {
    const psyPage = await PsyPage.findOne();

    if (!psyPage) {
      return res.status(404).json({ message: "PsyPage not found" });
    }

    res.json(psyPage);
  } catch (error) {
    console.error("Error fetching PsyPage:", error);
    res.status(500).json({ message: error.message });
  }
};

export { createPsyPage, updatePsyPage, getPsyPage };
