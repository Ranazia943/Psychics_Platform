import ProfileStep5 from "../models/Psychics/ProfileStep5.model.js";
import Psychics from "../models/psychics.model.js";

export const addProfileStep5 = async (req, res) => {
  try {
    const { psychicId, availability } = req.body;

    // Check if the Psychic exists
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Validate availability object (it should be an array, but no specific length requirement)
    if (!Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({ message: "Availability must be an array with at least one time slot" });
    }

    // Validate each time slot
    for (let i = 0; i < availability.length; i++) {
      const { day, fromTime, toTime } = availability[i];

      if (!day || !fromTime || !toTime) {
        return res.status(400).json({
          message: `Time slot at index ${i} must include day, fromTime, and toTime`,
        });
      }

      // Optional: You can add time format validation here to ensure 'fromTime' and 'toTime' follow a proper format
    }

    // Create a new ProfileStep5 entry
    const profileStep5 = new ProfileStep5({
      psychicId,
      availability,
    });

    // Save the entry to the database
    await profileStep5.save();

    res.status(201).json({
      message: "Profile Step 5 details added successfully",
      profileStep5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding profile step 5 details",
      error: error.message,
    });
  }
};


export const updateProfileStep5 = async (req, res) => {
  try {
    const { psychicId } = req.params;
    const { availability } = req.body;

    // Check if the Psychic exists
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Validate availability object
    if (!Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({ message: "Availability must be an array with at least one time slot" });
    }

    // Validate each time slot
    for (let i = 0; i < availability.length; i++) {
      const { day, fromTime, toTime } = availability[i];

      if (!day || !fromTime || !toTime) {
        return res.status(400).json({
          message: `Time slot at index ${i} must include day, fromTime, and toTime`,
        });
      }

      // Optional: Add time format validation
    }

    // Update the ProfileStep5 entry
    const updatedProfileStep5 = await ProfileStep5.findOneAndUpdate(
      { psychicId },
      { availability },
      { new: true, upsert: true } // `upsert: true` creates the document if it doesn't exist
    );

    res.status(200).json({
      message: "Profile Step 5 updated successfully",
      updatedProfileStep5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating profile step 5 details",
      error: error.message,
    });
  }
};


export const getProfileStep5 = async (req, res) => {
  try {
    const { psychicId } = req.params;

    // Fetch the ProfileStep5 entry
    const profileStep5 = await ProfileStep5.findOne({ psychicId });

    if (!profileStep5) {
      return res.status(404).json({ message: "Profile Step 5 not found for this psychic" });
    }

    res.status(200).json({
      message: "Profile Step 5 details fetched successfully",
      profileStep5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching profile step 5 details",
      error: error.message,
    });
  }
};
