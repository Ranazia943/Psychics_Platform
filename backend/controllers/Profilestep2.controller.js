import mongoose from 'mongoose';
import Profile from "../models/Psychics/Profile.model.js";
import Psychics from "../models/psychics.model.js";
import ProfileStep4 from "../models/Psychics/ProfileStep4.model.js";
import ProfileStep3 from "../models/Psychics/ProfileStep3.model.js";
import ProfileStep5 from "../models/Psychics/ProfileStep5.model.js";


export const fetchProfilesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 6; // Default limit is 6
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    console.log("Fetching profiles for category:", category);

    // Validate the category parameter
    if (!category) {
      return res.status(400).json({ message: "Category parameter is required" });
    }

    // Query profiles by category with pagination
    const profiles = await Profile.find({ category: { $in: [category] } })
      .skip(skip)
      .limit(limit);

    console.log("Fetched profiles:", profiles);

    // If no profiles are found, return a 404 error
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found for this category" });
    }

    // Extract psychic IDs from the profiles
    const psychicIds = profiles.map(profile => profile.Psychics);
    console.log("Psychic IDs:", psychicIds);

    // Fetch psychics and related profile step 4 data
    const psychics = await Psychics.find({ '_id': { $in: psychicIds } });
    const profileStep4s = await ProfileStep4.find({ 'psychicId': { $in: psychicIds } }); // Fixed field name

    console.log("Fetched Psychics:", psychics);
    console.log("Fetched Profile Step 4s:", profileStep4s);

    // Enrich profiles with psychic and profile step 4 data
    const enrichedProfiles = profiles.map(profile => {
      const psychic = psychics.find(p => p._id.toString() === profile.Psychics.toString());
      const profileStep4 = profileStep4s.find(p4 => p4.psychicId.toString() === profile.Psychics.toString()); // Fixed field name

      console.log("Enriched Profile:", { ...profile.toObject(), psychic, profileStep4 });

      return {
        ...profile.toObject(),
        psychic,
        profileStep4,
      };
    });

    // Get the total number of profiles for pagination
    const totalProfiles = await Profile.countDocuments({ category: { $in: [category] } });

    // Return the enriched profiles with pagination details
    res.status(200).json({
      profiles: enrichedProfiles,
      currentPage: page,
      totalPages: Math.ceil(totalProfiles / limit),
      totalProfiles,
    });
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    res.status(500).json({ message: "Failed to fetch profiles", error });
  }
};

export const addProfileStep2 = async (req, res) => {
  try {
    const {
      psychicId,
      birthDate,
      category,
      primarySkills,
      allSkills,
      language,
      chargesPerMin,
      videoChargesPerMin,
      reportCharges,
      experienceYears,
      dailyHours,
      referredBy,
      workingOnOtherPlatform,
    } = req.body;

    // Check if the referenced Psychic exists and is verified
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Create a new Profile entry with a reference to the Psychics model
    const profileStep2 = new Profile({
      Psychics: psychicId, // This should match the field name in your schema
      birthDate,
      category,
      primarySkills,
      allSkills,
      language,
      chargesPerMin,
      videoChargesPerMin,
      reportCharges,
      experienceYears,
      dailyHours,
      referredBy,
      workingOnOtherPlatform,
    });

    // Save the new profile to the database
    await profileStep2.save();

    res.status(201).json({
      message: "Profile Step 2 details added successfully",
      profileStep2,
    });
  } catch (error) {
    console.error("Error adding profile step 2 details:", error);
    res.status(500).json({
      message: "An error occurred while adding profile step 2 details",
      error: error.message,
    });
  }
};

export const updateProfileStep2 = async (req, res) => {
  try {
    const { psychicId } = req.params; // Ensure you use the same name as in the URL parameter
    const {
      birthDate,
      category,
      primarySkills,
      allSkills,
      language,
      chargesPerMin,
      videoChargesPerMin,
      reportCharges,
      experienceYears,
      dailyHours,
      referredBy,
      workingOnOtherPlatform,
    } = req.body;

    // Check if the psychic exists by their ID
    const psychicExists = await Psychics.findById(psychicId);
    if (!psychicExists) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Find if there's already a profile for this psychic
    let profileStep2 = await Profile.findOne({ Psychics: psychicId });

    if (!profileStep2) {
      // If no profile exists, create a new one
      profileStep2 = new Profile({
        Psychics: psychicId,
        birthDate,
        category,
        primarySkills,
        allSkills,
        language,
        chargesPerMin,
        videoChargesPerMin,
        reportCharges,
        experienceYears,
        dailyHours,
        referredBy,
        workingOnOtherPlatform,
      });
    } else {
      // Update the existing profile with new values
      profileStep2.birthDate = birthDate || profileStep2.birthDate;
      profileStep2.category = category || profileStep2.category;
      profileStep2.primarySkills = primarySkills || profileStep2.primarySkills;
      profileStep2.allSkills = allSkills || profileStep2.allSkills;
      profileStep2.language = language || profileStep2.language;
      profileStep2.chargesPerMin = chargesPerMin || profileStep2.chargesPerMin;
      profileStep2.videoChargesPerMin = videoChargesPerMin || profileStep2.videoChargesPerMin;
      profileStep2.reportCharges = reportCharges || profileStep2.reportCharges;
      profileStep2.experienceYears = experienceYears || profileStep2.experienceYears;
      profileStep2.dailyHours = dailyHours || profileStep2.dailyHours;
      profileStep2.referredBy = referredBy || profileStep2.referredBy;
      profileStep2.workingOnOtherPlatform = workingOnOtherPlatform !== undefined ? workingOnOtherPlatform : profileStep2.workingOnOtherPlatform;
    }

    await profileStep2.save();

    res.status(200).json({
      message: "Profile Step 2 details updated successfully",
      profileStep2,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating profile step 2 details",
      error: error.message,
    });
  }
};


export const fetchProfileStep2 = async (req, res) => {
  try {
    const { profileId } = req.params; // Use profileId from the route
    console.log("Profile ID from params:", profileId);

    // Check if the Profile ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ message: "Invalid Profile ID format" });
    }

    // Fetch the profile by ID
    const profile = await Profile.findById(profileId);

    // If no profile is found, return a 404 error
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Extract the Psychics ID from the profile
    const psychicId = profile.Psychics;

    // Fetch the psychic by ID
    const psychic = await Psychics.findById(psychicId);

    // If no psychic is found, return a 404 error
    if (!psychic) {
      return res.status(404).json({ message: 'Psychic not found' });
    }

    // Fetch related profile data
    const [profileStep3, profileStep4, profileStep5] = await Promise.all([
      ProfileStep3.findOne({ psychicId }),
      ProfileStep4.findOne({ psychicId }),
      ProfileStep5.findOne({ psychicId }),
    ]);

    // Combine all data into a single response object
    const psychicData = {
      psychic,
      profile: {
        _id: profile._id,
        Psychics: profile.Psychics,
        birthDate: profile.birthDate,
        category: profile.category,
        primarySkills: profile.primarySkills,
        allSkills: profile.allSkills,
        language: profile.language,
        chargesPerMin: profile.chargesPerMin,
        videoChargesPerMin: profile.videoChargesPerMin,
        reportCharges: profile.reportCharges,
        experienceYears: profile.experienceYears,
        dailyHours: profile.dailyHours,
        referredBy: profile.referredBy,
        workingOnOtherPlatform: profile.workingOnOtherPlatform,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      profileStep3,
      profileStep4,
      profileStep5,
    };

    // Return the fetched psychic data
    res.status(200).json({
      message: 'Psychic data fetched successfully',
      data: psychicData,
    });
  } catch (error) {
    console.error('Error fetching psychic data:', error);
    res.status(500).json({
      message: 'Failed to fetch psychic data',
      error: error.message,
    });
  }
};

export const getPsychicById = async (req, res) => {
  const { psychicId } = req.params; // Extract psychicId from the request parameters

  try {
    // Validate the psychicId
    if (!mongoose.Types.ObjectId.isValid(psychicId)) {
      return res.status(400).json({ message: 'Invalid psychic ID format' });
    }

    // Fetch the psychic by ID
    const psychic = await Psychics.findById(psychicId);

    // If no psychic is found, return a 404 error
    if (!psychic) {
      return res.status(404).json({ message: 'Psychic not found' });
    }

    // Fetch related profile data
    const profile = await Profile.findOne({ Psychics: psychicId });
    const profileStep3 = await ProfileStep3.findOne({ psychicId });
    const profileStep4 = await ProfileStep4.findOne({ psychicId });
    const profileStep5 = await ProfileStep5.findOne({ psychicId });

    // Combine all data into a single response object
    const psychicData = {
      psychic,
      profile,
      profileStep3,
      profileStep4,
      profileStep5,
    };

    // Return the fetched psychic data
    res.status(200).json({
      message: 'Psychic data fetched successfully',
      data: psychicData,
    });
  } catch (error) {
    console.error('Error fetching psychic data:', error);
    res.status(500).json({ message: 'Failed to fetch psychic data', error: error.message });
  }
};