import PsychicDetails from "../models/Psychics/ProfileStep3.model.js";
import Psychics from "../models/psychics.model.js";

export const addPsychicDetails = async (req, res) => {
  try {
    const {
      psychicId,
      businessSource,
      qualification,
      degreeDiploma,
      collegeName,
      learnedAstrologyFrom,
      instagramProfile,
      facebookProfile,
      linkedInProfile,
      youtubeProfile,
      websiteProfile,
    } = req.body;

    // Validate Psychic existence
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Create a new PsychicDetails entry
    const psychicDetails = new PsychicDetails({
      psychicId,
      businessSource,
      qualification,
      degreeDiploma,
      collegeName,
      learnedAstrologyFrom,
      instagramProfile,
      facebookProfile,
      linkedInProfile,
      youtubeProfile,
      websiteProfile,
    });

    // Save to database
    await psychicDetails.save();

    res.status(201).json({
      message: "Psychic details added successfully",
      psychicDetails,
    });
  } catch (error) {
    console.error("Error adding psychic details:", error.message);
    res.status(500).json({
      message: "An error occurred while adding psychic details",
      error: error.message,
    });
  }
};

export const updatePsychicDetails = async (req, res) => {
  try {
    const { psychicId } = req.params;
    const updateData = req.body;

    // Remove _id if it exists in the updateData
    if (updateData._id) {
      delete updateData._id;
    }

    // Validate Psychic existence
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Update PsychicDetails entry
    const updatedPsychicDetails = await PsychicDetails.findOneAndUpdate(
      { psychicId },
      updateData,
      { new: true, upsert: true } // `new: true` returns the updated document
    );

    res.status(200).json({
      message: "Psychic details updated successfully",
      updatedPsychicDetails,
    });
  } catch (error) {
    console.error("Error updating psychic details:", error.message);
    res.status(500).json({
      message: "An error occurred while updating psychic details",
      error: error.message,
    });
  }
};


export const getPsychicDetails = async (req, res) => {
  try {
    const { psychicId } = req.params;

    // Fetch PsychicDetails entry
    const psychicDetails = await PsychicDetails.findOne({ psychicId });

    if (!psychicDetails) {
      return res.status(404).json({ message: "Psychic details not found" });
    }

    res.status(200).json({
      message: "Psychic details fetched successfully",
      psychicDetails,
    });
  } catch (error) {
    console.error("Error fetching psychic details:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching psychic details",
      error: error.message,
    });
  }
};
