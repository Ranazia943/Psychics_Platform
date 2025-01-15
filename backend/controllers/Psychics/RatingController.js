import mongoose from 'mongoose';
import RatingComment from '../../models/Psychics/Ratingcomment.model.js';
import User from '../../models/user.model.js';
import Psychic from '../../models/psychics.model.js'; // Import the Psychic model

export const addRatingCommentAndGift = async (req, res) => {
  const { userId, psychicId, rating, comment, giftAmount } = req.body;

  try {
    // Validate the input
    if (!userId || !psychicId || !rating || !comment) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the psychic exists
    const psychic = await Psychic.findById(psychicId);
    if (!psychic) {
      return res.status(404).json({ message: "Psychic not found." });
    }

    // Validate the rating (should be between 1 and 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Validate the gift amount (if provided)
    const validGiftAmounts = [100, 200, 300, 500, 800, 1000];
    if (giftAmount && !validGiftAmounts.includes(giftAmount)) {
      return res.status(400).json({ message: "Invalid gift amount." });
    }

    // Deduct the gift amount from the user's wallet (if provided)
    if (giftAmount) {
      if (user.walletBalance < giftAmount) {
        return res.status(400).json({ message: "Insufficient wallet balance." });
      }
      user.walletBalance -= giftAmount;
      await user.save();
    }

    // Create the new rating and comment
    const newRatingComment = new RatingComment({
      userId,
      psychicId,
      rating,
      comment,
      giftAmount: giftAmount || 0,
    });

    // Save the rating and comment
    await newRatingComment.save();

    res.status(201).json({
      message: "Rating, comment, and gift (if any) added successfully.",
      data: newRatingComment,
    });
  } catch (error) {
    console.error("Error adding rating and comment:", error); // Debugging
    res.status(500).json({ message: "Error adding rating and comment.", error: error.message });
  }
};


export const fetchRatingsByPsychicId = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Fetch all ratings for the psychic
    const ratings = await RatingComment.find({ psychicId }).populate('userId', 'username email'); // Populate user details if needed

    // Calculate the total number of ratings
    const totalRatings = ratings.length;

    res.status(200).json({
      psychicId,
      totalRatings,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings.", error: error.message });
  }
};