import Empath from "../../models/Love_Pages/EmpathModel.js";

// Update an existing MediumPage
const UpdateEmpathPage = async (req, res) => {
  const { MediumBanner, MediumPara, video, video_para, question, answer } =
    req.body;

  try {
    const mediumUpdatePage = await Empath.findOneAndUpdate(
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
const GetEmpathPage = async (req, res) => {
  try {
    const mediumPage = await Empath.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateEmpathPage, GetEmpathPage };
