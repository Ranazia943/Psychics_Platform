import Parent from "../../models/Love_Pages/ParentModel.js";

// Update an existing MediumPage
const UpdateParentPage = async (req, res) => {
  const { MediumBanner, video, video_para, question, answer } =
    req.body;

  try {
    const mediumUpdatePage = await Parent.findOneAndUpdate(
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
const GetParentPage = async (req, res) => {
  try {
    const mediumPage = await Parent.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateParentPage, GetParentPage };
