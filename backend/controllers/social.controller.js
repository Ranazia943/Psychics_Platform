// controllers/socialMediaController.js
import SocialMedia from '../models/Socialaccount.model.js'
// Fetch Social Media URLs
export const getSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findOne();
    res.status(200).json(socialMedia);
  } catch (error) {
    console.error("Error fetching social media URLs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Social Media URLs
export const updateSocialMedia = async (req, res) => {
  try {
    const { facebook, instagram, twitter, linkedin, youtube } = req.body;
    const socialMedia = await SocialMedia.findOneAndUpdate({}, {
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
    }, { new: true, upsert: true });
    
    res.status(200).json(socialMedia);
  } catch (error) {
    console.error("Error updating social media URLs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
