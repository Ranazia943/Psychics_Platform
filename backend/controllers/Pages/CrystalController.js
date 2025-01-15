import Crystal from "../../models/Pages/CrystalModel.js";

const CreateCrystalPage = async (req, res) => {
  const { CrystalBanner,video, videoPara, question, answer } = req.body;

  try {
    const CrystalNewPage = new Crystal({
      CrystalBanner,
      video,
      videoPara,
      question,
      answer,
    });

    const saveCrystalPage = await CrystalNewPage.save();
    res.status(201).json(saveCrystalPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateCrystalPage = async (req, res) => {
  const { CrystalBanner, video, videoPara, question, answer } = req.body;

  try {
    const CrystalUpdatePage = await Crystal.findOneAndUpdate(
      {}, // Match the first document
      {
        CrystalBanner,
        video,
        videoPara,
        question,
        answer,
      },
      { new: true }
    );

    if (!CrystalUpdatePage) {
      return res.status(400).json({
        message: "CrystalPage not updated",
      });
    }
    res.json(CrystalUpdatePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCrystalPage = async (req, res) => {
  try {
    const crystalPage = await Crystal.findOne();

    if (!crystalPage) {
      return res.status(404).json({ message: "CrystalPage not found" });
    }

    res.json(crystalPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { CreateCrystalPage, UpdateCrystalPage, getCrystalPage };
