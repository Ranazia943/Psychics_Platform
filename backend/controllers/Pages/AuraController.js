import AuraPage from "../../models/Pages/AuraReadingModel.js";



const UpdateAuraPage = async (req, res) => {
  const { AuraBanner, video, videoPara, question, answer } = req.body;

  try {
    const AuraUpdatePage = await AuraPage.findOneAndUpdate(
      {}, // Match the first document
      {
        AuraBanner,
        video,
        videoPara,
        question,
        answer,
      },
      { new: true }
    );

    if (!AuraUpdatePage) {
      return res.status(400).json({
        message: "PetPage not updated",
      });
    }
    res.json(AuraUpdatePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAuraPage = async (req, res) => {
  try {
    const psyPage = await AuraPage.findOne();

    if (!psyPage) {
      return res.status(404).json({ message: "PsyPage not found" });
    }

    res.json(psyPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateAuraPage, getAuraPage };
