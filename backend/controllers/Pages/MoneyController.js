import Money_Psychics from "../../models/Pages/MoneyModel.js";



// Update an existing MediumPage
const updateMoneyPage = async (req, res) => {
  const { MediumBanner, MediumPara, video, video_para, question, answer } =
    req.body;

  try {
    const mediumUpdatePage = await Money_Psychics.findOneAndUpdate(
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
const getMoneyPage = async (req, res) => {
  try {
    const mediumPage = await Money_Psychics.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {  updateMoneyPage, getMoneyPage };
