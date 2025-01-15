import How_work from "../../models/AboutPages/HowworkModel.js";

// Update an existing MediumPage
const UpdateworkPage = async (req, res) => {
  const {
    title,
    content,
    card_title1,
    card_content1,
    card_title2,
    card_content2,
    card_title3,
    card_content3,
    video_title,
    video_para,
    video,
  } = req.body;

  try {
    const mediumUpdatePage = await How_work.findOneAndUpdate(
      {}, // Match the first document
      {
        title,
        content,
        card_title1,
        card_content1,
        card_title2,
        card_content2,
        card_title3,
        card_content3,
        video_title,
        video_para,
        video,
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
const GetworkPage = async (req, res) => {
  try {
    const mediumPage = await How_work.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateworkPage, GetworkPage };
