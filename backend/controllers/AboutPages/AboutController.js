import About from "../../models/AboutPages/AboutModel.js";

// Update an existing MediumPage
const UpdateAboutPage = async (req, res) => {
  const {
    Banner,
    Banner_title,
    Banner_content,
    title1,
    content1,
    title2,
    content2,
    video_title,
    video_para,
    video,
    card_title1,
    card_content1,
    card_title2,
    card_content2,
  } = req.body;

  try {
    const mediumUpdatePage = await About.findOneAndUpdate(
      {}, // Match the first document
      {
        Banner,
        Banner_title,
        Banner_content,
        title1,
        content1,
        title2,
        content2,
        video_title,
        video_para,
        video,
        card_title1,
        card_content1,
        card_title2,
        card_content2,
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
const GetAboutPage = async (req, res) => {
  try {
    const mediumPage = await About.findOne();

    if (!mediumPage) {
      return res.status(404).json({ message: "MediumPage not found" });
    }

    res.json(mediumPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateAboutPage, GetAboutPage };
