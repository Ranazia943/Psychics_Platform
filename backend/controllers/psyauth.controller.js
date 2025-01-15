import bcrypt from "bcryptjs";
import Psychics from "../models/psychics.model.js";
import generatePsychicTokenAndSetCookie from "../utils/psyToken.js";
import Profile from "../models/Psychics/Profile.model.js"

export const psy_signup = async (req, res) => {
  try {
    const { email, username, password,profileImage, phoneno, gender } = req.body;

    // Basic input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/; // Adjusted for valid phone number lengths
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    if (!phoneno || !phoneRegex.test(phoneno)) {
      return res.status(400).json({ error: "Phone number must be 10-15 digits long" });
    }
    if (!gender || !["male", "female"].includes(gender.toLowerCase())) {
      return res.status(400).json({ error: "Gender must be either 'male' or 'female'" });
    }

    // Check if username or email already exists
    const existingPsychic = await Psychics.findOne({ username });
    const existingEmail = await Psychics.findOne({ email });
    if (existingPsychic) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new psychic to the database
    const newPsychic = new Psychics({
      email,
      username,
      password: hashedPassword,
      profileImage,
      phoneno,
      gender,
      verified: false, // Default status
    });

    await newPsychic.save();

    res.status(201).json({
      message: "Signup successful! Please wait for verification.",
      _id: newPsychic._id,
      email: newPsychic.email,
      username: newPsychic.username,
      phoneno: newPsychic.phoneno,
      verified: newPsychic.verified,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const psy_login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const existingPsychic = await Psychics.findOne({ username });
    if (!existingPsychic) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if the user is verified
    if (!existingPsychic.verified) {
      return res.status(403).json({
        error: "Your account is not verified. Please wait for verification.",
      });
    }

    // Validate the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingPsychic.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate and set token if login is successful
    generatePsychicTokenAndSetCookie(existingPsychic._id, res);

    res.status(200).json({
      message: "Login successful",
      _id: existingPsychic._id,
      email: existingPsychic.email,
      username: existingPsychic.username,
      profilePic: existingPsychic.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const psy_logout = (req, res) => {
  try {
    res.clearCookie("psychic_jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const fetchProfile = async (req, res) => {
  try {
    const psychicId = req.params.id;

    // Fetch Psychic details
    const psychic = await Psychics.findById(psychicId);
    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile: {
        email: psychic.email,
        username: psychic.username,
        phoneno: psychic.phoneno,
        profileImage: psychic.profileImage,
        gender: psychic.gender,
      },
    });
  } catch (error) {
    console.error("Error in fetchProfile controller:", error.message);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, newPassword, confirmNewPassword, phoneno, profileImage } = req.body;

    // Fetch the psychic
    const psychic = await Psychics.findById(id);
    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (phoneno) updateFields.phoneno = phoneno;
    if (profileImage) updateFields.profileImage = profileImage;

    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "New passwords don't match" });
      }
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(newPassword, salt);
    }

    // Update the psychic's details
    const updatedPsychic = await Psychics.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      profile: {
        email: updatedPsychic.email,
        username: updatedPsychic.username,
        phoneno: updatedPsychic.phoneno,
        profileImage: updatedPsychic.profileImage,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};



// Fetch profile data


export const getAllPsychics = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page from query params, default to 1
  const limit = 10; // Number of records per page
  const skip = (page - 1) * limit;

  try {
      // Fetch psychics with pagination
      const psychics = await Psychics.find({})
        .skip(skip)  // Skip records for previous pages
        .limit(limit);  // Limit the number of records

      // Get the total number of psychics for pagination information
      const total = await Psychics.countDocuments();

      // Send paginated response
      res.status(200).json({
        psychics,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
  }
};
export const deletePsychicById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the psychic by ID and delete
    const deletedPsychic = await Psychics.findByIdAndDelete(id);

    if (!deletedPsychic) {
      return res.status(404).json({ error: "Psychic not found" });
    }

    res.status(200).json({
      message: "Psychic deleted successfully",
    });
  } catch (error) {
    console.error("Error in deletePsychicById controller:", error.message);
    res.status(500).json({ error: "Failed to delete psychic" });
  }
};

export const addPsychicProfile = async (req, res) => {
  const {
    email,
    username,
    password,
    confirmPassword,
    gender,
    profilePic,
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

  const session = await Psychics.startSession();
  session.startTransaction();

  try {
    // 1. Validate that passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the Psychics user (Authentication details)
    const newPsychic = new Psychics({
      email,
      username,
      password: hashedPassword, // Use the hashed password
      gender,
      profilePic,
    });

    const savedPsychic = await newPsychic.save({ session });

    // 4. Create the Profile associated with the new psychic
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
      Psychics: savedPsychic._id, // Link profile to the psychic
    });

    const savedProfile = await newProfile.save({ session });

    // 5. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // 6. Send success response
    res.status(201).json({
      message: "Psychic profile created successfully",
      psychic: savedPsychic,
      profile: savedProfile,
    });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    // Log the error and send a failure response
    console.error("Error creating psychic profile:", error);
    res.status(500).json({ message: "Error creating psychic profile", error });
  } finally {
    // Ensure session ends even if an error occurs
    session.endSession();
  }
};

// In your controller file
export const getTotalPsychicsCount = async (req, res) => {
  try {
    const total = await Psychics.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error fetching total psychics count:", error.message);
    res.status(500).json({ error: "Failed to fetch total psychics count" });
  }
};

export const getPsychicStatus = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Find the psychic by ID
    const psychic = await Psychics.findById(psychicId);

    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Return the status
    res.status(200).json({ status: psychic.status });
  } catch (error) {
    res.status(500).json({ message: "Error fetching status", error: error.message });
  }
};
export const updatePsychicStatus = async (req, res) => {
  const { psychicId } = req.params;
  const { status } = req.body;

  try {
    // Find the psychic by ID
    const psychic = await Psychics.findById(psychicId);

    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found" });
    }

    // Validate the status value
    if (!["online", "offline"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Must be 'online' or 'offline'." });
    }

    // Update the status
    psychic.status = status;
    await psychic.save();

    res.status(200).json({ message: "Status updated successfully", status: psychic.status });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};