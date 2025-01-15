import ProfileStep4 from "../models/Psychics/ProfileStep4.model.js";
import Psychics from "../models/psychics.model.js";

export const addProfileStep4 = async (req, res) => {
  try {
    const {
      psychicId,
      minEarningExpectation,
      maxEarningExpectation,
      countriesTraveled,
      currentJobStatus,
      longBio,
      qualitiesOfPsychic,
      biggestChallenge,
      repeatedQuestionHandling,
    } = req.body;

    // Check if the Psychic exists
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Create a new ProfileStep4 entry
    const profileStep4 = new ProfileStep4({
      psychicId,
      minEarningExpectation,
      maxEarningExpectation,
      countriesTraveled,
      currentJobStatus,
      longBio,
      qualitiesOfPsychic,
      biggestChallenge,
      repeatedQuestionHandling,
    });

    // Save the entry to the database
    await profileStep4.save();

    res.status(201).json({ message: "Profile Step 4 details added successfully", profileStep4 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding profile step 4 details", error: error.message });
  }
};



// Fetch ProfileStep4 by Psychic ID
export const fetchProfileById = async (req, res) => {
  try {
    const { psychicId } = req.params;

    // Check if the Psychic exists
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Fetch the profile step 4 by psychicId
    const profileStep4 = await ProfileStep4.findOne({ psychicId });
    if (!profileStep4) {
      return res.status(404).json({ message: "Profile Step 4 not found for this psychic" });
    }

    res.status(200).json({ profileStep4 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching profile step 4", error: error.message });
  }
};

// Update ProfileStep4 by Psychic ID
export const updateProfileById = async (req, res) => {
  try {
    const { psychicId } = req.params;

    // Check if the Psychic exists
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Destructure _id to ensure it is not updated
    const { _id, ...updateData } = req.body;

    // Update the ProfileStep4 entry
    const updatedProfile = await ProfileStep4.findOneAndUpdate(
      { psychicId },
      updateData,
      { new: true, upsert: true } // `new: true` returns the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile Step 4 not found for this psychic" });
    }

    res.status(200).json({ message: "Profile Step 4 updated successfully", updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating profile step 4", error: error.message });
  }
};

