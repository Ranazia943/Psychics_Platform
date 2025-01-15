import mongoose from 'mongoose';
import PaidTimer from './Paidtimer.model.js'; // Import the PaidTimer model

const ratingCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches your User model
    required: true,
  },
  psychicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Psy_Profile', // Ensure this matches your Profile model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Assuming a 1-5 scale
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  giftAmount: {
    type: Number,
    required: false,
    min: 100,
    max: 1000,
  },
}, { timestamps: true });

// Pre-save hook to validate the PaidTimer status
ratingCommentSchema.pre('save', async function (next) {
  const { userId, psychicId } = this;

  // Check if there is a completed PaidTimer for this user and psychic
  const paidTimer = await PaidTimer.findOne({
    userId,
    psychicId,
    status: 'completed',
  });

  if (!paidTimer) {
    throw new Error('No completed session found with this psychic. You cannot add a rating.');
  }


});

const RatingComment = mongoose.model('RatingComment', ratingCommentSchema);

export default RatingComment;