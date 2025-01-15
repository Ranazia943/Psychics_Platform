import Past_life from "../../models/Pages/PastlifeModel.js";

// Update an existing MediumPage
const updateLifePage = async (req, res) => {
  const { MediumBanner, MediumPara, video, video_para, question, answer } =
    req.body;

  try {
    const mediumUpdatePage = await Past_life.findOneAndUpdate(
      {}, // Match the first document
      {
        MediumBanner,
        MediumPara,
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
const getLifePage = async (req, res) => {
  try {
    const mediumPage = await Past_life.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateLifePage, getLifePage };
