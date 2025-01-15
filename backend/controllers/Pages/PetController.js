import PetPage from "../../models/Pages/PetModel.js";

const CreatePetPage = async (req, res) => {
  const { PetBanner, video, videoPara, question, answer } = req.body;

  try {
    console.log("Received request body:", req.body);

    const PetNewPage = new PetPage({
      PetBanner,
      video,
      videoPara,
      question,
      answer,
    });

    const savePetPage = await PetNewPage.save();
    console.log("Saved PetPage:", savePetPage);

    res.status(201).json(savePetPage);
  } catch (error) {
    console.error("Error saving PetPage:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const UpdatePetPage = async (req, res) => {
  const { PetBanner, video, videoPara, question, answer } = req.body;

  try {
    const PetUpdatePage = await PetPage.findOneAndUpdate(
      {}, // Match the first document
      {
        PetBanner,
        video,
        videoPara,
        question,
        answer,
      },
      { new: true }
    );

    if (!PetUpdatePage) {
      return res.status(400).json({
        message: "PetPage not updated",
      });
    }
    res.json(PetUpdatePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPage = async (req, res) => {
  try {
    const psyPage = await PetPage.findOne();

    if (!psyPage) {
      return res.status(404).json({ message: "PsyPage not found" });
    }

    res.json(psyPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdatePetPage, CreatePetPage, getPage };
