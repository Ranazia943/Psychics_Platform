import Help from "../../models/AboutPages/helpModel.js";

// Update an existing HelpPage
const UpdateHelpPage = async (req, res) => {
  const {
    Banner,
    title1,
    content1,
    title2,
    content2,
    image_title,
    image_para,
    image,
    image_title1,
    image_para1,
    image1,
    card_title1,
    card_content1,
  } = req.body;

  try {
    const updatedHelpPage = await Help.findOneAndUpdate(
      {}, // Match the first document
      {
        Banner,
        title1,
        content1,
        title2,
        content2,
        image_title,
        image_para,
        image,
        image_title1,
        image_para1,
        image1,
        card_title1,
        card_content1,
      },
      { new: true }
    );

    if (!updatedHelpPage) {
      return res.status(400).json({
        message: "Help page not updated",
      });
    }
    res.json(updatedHelpPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a HelpPage
const GetHelpPage = async (req, res) => {
  try {
    const helpPage = await Help.findOne();

    if (!helpPage) {
      return res.status(404).json({ message: "Help page not found" });
    }

    res.json(helpPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdateHelpPage, GetHelpPage };
