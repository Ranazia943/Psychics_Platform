import Cheating from "../../models/Love_Pages/CheatingModel.js";

// Update an existing MediumPage
const UpdateCheatingPage = async (req, res) => {
  const { MediumBanner, video, video_para, question, answer } =
    req.body;

  try {
    const mediumUpdatePage = await Cheating.findOneAndUpdate(
      {}, // Match the first document
      {
        MediumBanner,
       
        video,
        video_para,
        question,
        answer,
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
const GetCheatingPage = async (req, res) => {
  try {
    const mediumPage = await Cheating.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateCheatingPage, GetCheatingPage };
