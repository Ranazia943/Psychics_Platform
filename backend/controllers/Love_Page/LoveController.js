import LovePage from "../../models/Love_Pages/LoveModel.js";

// Fetch the page details
export const getLovePageDetails = async (req, res) => {
  try {
    const lovePage = await LovePage.findOne();
    if (!lovePage) {
      return res.status(404).json({ message: "Love Page details not found" });
    }
    res.status(200).json(lovePage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update the page details
export const updateLovePageDetails = async (req, res) => {
  try {
    const updatedPage = await LovePage.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
