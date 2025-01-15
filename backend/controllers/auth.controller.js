import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, gender } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate profile picture URL based on gender
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      gender,
      profilePic,
      walletBalance: 0, // Optional if not provided during signup
    });

    // Save the new user and generate a token
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with the new user's data
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      profilePic: newUser.profilePic,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare the passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if the user is an admin
    if (user.role === 'admin') {
      // Generate JWT token and set cookie
      generateTokenAndSetCookie(user._id, res);

      // Respond with admin details
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
        role: user.role, // Include role in the response
        message: "Admin login successful",
      });
    }

    // Generate JWT token and set cookie for non-admin
    generateTokenAndSetCookie(user._id, res);

    // Respond with user details
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      role: user.role, // Include role in the response
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Logout Controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch User Profile Controller
export const fetchUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user profile details
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      gender: user.gender,
      walletBalance: user.walletBalance,
      message: "User profile data fetched successfully",
    });
  } catch (error) {
    console.error("Error in fetchUserProfile controller:", error.message);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// Update User Profile Controller
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      username,
      gender,
      newPassword,
      confirmNewPassword,
      profilePic,
    } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare the fields to update
    const updateFields = { email, username, gender };

    // If profilePic is provided, update it
    if (profilePic) {
      updateFields.profilePic = profilePic;
    }

    // Handle password change if applicable
    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "New passwords don't match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      updateFields.password = hashedNewPassword;
    }

    // Update user in the database
    const updatedUserProfile = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    // Return updated profile data
    res.status(200).json({
      _id: updatedUserProfile._id,
      email: updatedUserProfile.email,
      username: updatedUserProfile.username,
      profilePic: updatedUserProfile.profilePic,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updateUserProfile controller:", error.message);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};


// Get Total Users Controller
export const getTotalUsers = async (req, res) => {
  try {
    // Count the number of users in the database
    const totalUsers = await User.countDocuments({});
    
    // Respond with the total user count
    res.status(200).json({
      totalUsers,
      message: "Total users fetched successfully",
    });
  } catch (error) {
    console.error("Error in getTotalUsers controller:", error.message);
    res.status(500).json({ error: "Failed to fetch total users" });
  }
};

// Fetch All Users Controller
// Fetch All Users Controller
export const fetchAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page from query params, default to 1
  const limit = 10; // Number of records per page
  const skip = (page - 1) * limit; // Calculate the number of records to skip for pagination

  try {
    // Fetch users with pagination, excluding the password field for security
    const users = await User.find({})
      .select('-password')
      .skip(skip)
      .limit(limit);

    // Get the total number of users for pagination information
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit), // Total pages based on the number of users and limit
      currentPage: page,
      totalUsers, // Total number of users
      message: "All users fetched successfully",
    });
  } catch (error) {
    console.error("Error in fetchAllUsers controller:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};





export const addFundToUserWallet = async (req, res) => {
  const { userId, amount } = req.body;

  console.log(`Adding funds: UserID - ${userId}, Amount - ${amount}`);

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.walletBalance += amount;
    console.log(`New Wallet Balance: ${user.walletBalance}`); // Log new balance
    await user.save();

    return res.status(200).json({ message: 'Funds added successfully', walletBalance: user.walletBalance });
  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
// Import the User model

// Function to delete a user by ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  try {
    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with a success message
    return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

