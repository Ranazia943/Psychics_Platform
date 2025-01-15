import Profile from "../../models/Psychics/Profile.model.js";
import Psychics from "../../models/psychics.model.js";
import mongoose from "mongoose"; // Ensure mongoose is imported
import bcrypt from "bcryptjs";
import generatePsychicTokenAndSetCookie from "../../utils/psyToken.js";

// Add a new profile
export const addProfile = async (req, res) => {
  try {
    const {
      expertCategory,
      phoneNo,
      ratePM,
      crossRate,
      country,
      about,
      Introlin,
      topics,
      tools,
      abilities,
      Psychics: psychicId,
    } = req.body;

    // Ensure that the Psychic reference exists
    const psychic = await Psychics.findById(psychicId);
    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Check if the profile already exists for this psychic
    const existingProfile = await Profile.findOne({ Psychics: psychicId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists. You cannot add it again." });
    }

    // Create a new profile if it doesn't exist
    const newProfile = new Profile({
      expertCategory,
      phoneNo,
      ratePM,
      crossRate,
      country,
      about,
      Introlin,
      topics,
      tools,
      abilities,
      Psychics: psychicId,
    });

    await newProfile.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error("Failed to create profile", error);
    res.status(500).json({ message: "Failed to create profile", error });
  }
};


export const searchProfiles = async (req, res) => {
  const { username, expertCategory, topics, tools } = req.query;

  try {
    const results = await Profile.find()
      .populate('Psychics', 'username') // Populate with username
      .or([
        { 'Psychics.username': { $regex: username, $options: 'i' } }, // Case-insensitive match
        { expertCategory: { $regex: expertCategory, $options: 'i' } },
        { topics: { $regex: topics, $options: 'i' } },
        { tools: { $regex: tools, $options: 'i' } },
      ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update Profile and Psychic Information
// Update Profile and Psychic Information
export const updateProfile = async (req, res) => {
  try {
    const psychicId = req.params.id;
    const profileData = req.body; // Adjusted to directly take profileData

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(psychicId)) {
      return res.status(400).json({ error: "Invalid Psychic ID" });
    }

    // Update Profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { Psychics: psychicId },
      profileData,
      { new: true, runValidators: true } // Added runValidators to enforce schema validation
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Failed to update profile", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};


export const toggleStatus = async (req, res) => {
  try {
    const psychicId = req.params.id;
    const { status } = req.body; // Should be either "busy" or ""

    // Find the profile by Psychic ID
    const profile = await Profile.findOne({ Psychics: psychicId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Toggle the status between "" (available) and "busy"
    profile.status = status;
    await profile.save();

    res.status(200).json({ message: "Status updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};


// Fetch Profile by Psychic ID
export const fetchProfile = async (req, res) => {
  try {
    const psychicId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(psychicId)) {
      return res.status(400).json({ error: "Invalid Psychic ID" });
    }

    // Fetch Profile
    const profile = await Profile.findOne({ Psychics: psychicId }).populate(
      "Psychics"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Failed to fetch profile", error);
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

/////

export const fetchpsychicsbyId = async (req, res) => {
  try {
    const psychicId = req.params.id;

    // Validate ObjectId  
    if (!mongoose.Types.ObjectId.isValid(psychicId)) {
      return res.status(400).json({ error: "Invalid Psychic ID" });
    }

    // Fetch psychic and profile data
    const psychic = await Psychics.findById(psychicId);
    const profile = await Profile.findOne({ Psychics: psychicId });

    if (!psychic) {
      return res.status(404).json({ error: "Psychic not found" });
    }

    res.status(200).json({
      psychic,
      profile,
      message: "Data returned successfully",
    });
  } catch (error) {
    console.error("Error in fetchpsychicsbyId controller:", error.message);
    res.status(400).json({ error: "Failed to fetch psychic" });
  }
};


// Fetch Profiles by Expert Category

export const fetchProfilesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const profiles = await Profile.find({ expertCategory: category })
      .populate({
        path: "Psychics",
        select: "username profilePic createdAt", // Ensure createdAt is included
      })
      .skip(skip)
      .limit(limit);

    const totalProfiles = await Profile.countDocuments({
      expertCategory: category,
    });

    if (profiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this category" });
    }

    res.status(200).json({
      profiles,
      currentPage: page,
      totalPages: Math.ceil(totalProfiles / limit),
      totalProfiles,
    });
  } catch (error) {
    console.error("Failed to fetch profiles", error);
    res.status(500).json({ message: "Failed to fetch profiles", error });
  }
};
// Fetch All Profiles with Pagination
// Fetch All Profiles with Pagination
export const fetchAllProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Fetch all profiles without filtering by category
    const profiles = await Profile.find()
      .populate({
        path: "Psychics",
        select: "username profilePic createdAt verified", // Include verified status
      })
      .skip(skip)
      .limit(limit);

    // Count total profiles (for pagination)
    const totalProfiles = await Profile.countDocuments();

    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json({
      profiles,
      currentPage: page,
      totalPages: Math.ceil(totalProfiles / limit),
      totalProfiles,
    });
  } catch (error) {
    console.error("Failed to fetch profiles", error);
    res.status(500).json({ message: "Failed to fetch profiles", error });
  }
};


export const verifyPsychic = async (req, res) => {
  try {
    const { id } = req.params; // Psychic ID from the URL
    const { verified } = req.body; // Verification status from the request body

    // Validate the input
    if (typeof verified !== 'boolean') {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    // Find the psychic by ID
    const psychic = await Psychics.findById(id);

    // If psychic not found, return 404
    if (!psychic) {
      return res.status(404).json({ message: 'Psychic not found' });
    }

    // Check if the psychic is already verified
    if (psychic.verified) {
      return res.status(400).json({ message: 'Psychic is already verified and cannot be updated.' });
    }

    // Update the verified field only if the psychic is not verified
    psychic.verified = verified;
    await psychic.save();

    // Return success response with the updated psychic
    res.status(200).json({
      message: `Psychic ${psychic.username} is now ${verified ? 'verified' : 'unverified'}`,
      psychic,
    });
  } catch (err) {
    console.error('Error updating verification status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export const addPsychicCompleteProfile = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      confirmPassword,
      gender,
      expertCategory,
      phoneNo,
      ratePM,
      crossRate,
      country,
      about,
      Introlin,
      topics,
      tools,
      abilities,
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if username already exists
    const existingPsychic = await Psychics.findOne({ username });
    if (existingPsychic) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new psychic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newPsychic = new Psychics({
      email,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save the psychic
    await newPsychic.save();

    // Create the profile
    const newProfile = new Profile({
      expertCategory,
      phoneNo,
      ratePM,
      crossRate,
      country,
      about,
      Introlin,
      topics,
      tools,
      abilities,
      Psychics: newPsychic._id, // Reference to the new psychic
    });

    // Save the profile
    await newProfile.save();

    // Generate token and set cookie
    generatePsychicTokenAndSetCookie(newPsychic._id, res);

    // Send response
    res.status(201).json({
      _id: newPsychic._id,
      email: newPsychic.email,
      username: newPsychic.username,
      profilePic: newPsychic.profilePic,
      profile: newProfile, // Return the created profile
    });
  } catch (error) {
    console.error("Error in addPsychicCompleteProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch All Psychics with Pagination

