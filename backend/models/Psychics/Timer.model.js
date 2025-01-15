import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  psychicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Psychics',
    required: true,
  },
  freeTimerStartedAt: {
    type: Date,
    default: null,
  },
  freeTimerUsed: {
    type: Boolean,
    default: false,
  },
  timeElapsed: {
    type: Number,
    default: 0, // Time elapsed in seconds
  },
  freeTimerStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
});

timerSchema.methods.calculateRemainingTime = function() {
  if (this.freeTimerStartedAt && this.freeTimerStatus === 'accepted') {
    const now = new Date();
    const diffInSeconds = Math.floor((now - this.freeTimerStartedAt) / 1000); // Difference in seconds
    return Math.max(180 - diffInSeconds, 0); // 180 seconds (3 minutes)
  }
  return 180; // Default 3 minutes if not started
};

const Timer = mongoose.model('Timerfree', timerSchema);
export default Timer;
