import MediumPage from "../../models/Pages/MediumModel.js";

// Create a new MediumPage
const createMediumPage = async (req, res) => {
  const { MediumBanner, MediumPara, title1, Para1, title2, Para2 } = req.body;

  try {
    console.log("Received request body:", req.body);

    const mediumNewPage = new MediumPage({
      MediumBanner,
      MediumPara,
      title1,
      Para1,
      title2,
      Para2,
    });

    const saveMediumPage = await mediumNewPage.save();
    console.log("Saved MediumPage:", saveMediumPage);

    res.status(201).json(saveMediumPage);
  } catch (error) {
    console.error("Error saving MediumPage:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update an existing MediumPage
const updateMediumPage = async (req, res) => {
  const { MediumBanner, MediumPara, title1, Para1, title2, Para2 } = req.body;

  try {
    const mediumUpdatePage = await MediumPage.findOneAndUpdate(
      {}, // Match the first document
      {
        MediumBanner,
        MediumPara,
        title1,
        Para1,
        title2,
        Para2,
      },
      { new: true }
    );

    if (!mediumUpdatePage) {
      return res.status(400).json({
        message: "MediumPage not updated",
      });
    }
    res.json(mediumUpdatePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a MediumPage
const getMediumPage = async (req, res) => {
  try {
    const mediumPage = await MediumPage.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createMediumPage, updateMediumPage, getMediumPage };
