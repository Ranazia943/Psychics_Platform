import mongoose from 'mongoose';
const paidTimerSchema = new mongoose.Schema(
  {
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
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'running', 'completed'],
      default: 'pending',
    },
    duration: {
      type: Number, // duration in minutes
      default: 0,
    },
    chargesPerMin: {
      type: Number,
      required: true,
    },
    userBalanceDeducted: {
      type: Number,
      default: 0,
    },
    userBalance: {
      type: Number,
      required: true,
    },
    endedBy: { // New field to store who ended the timer
      type: String,
      enum: ['user', 'psychic'],
    },
  },
  { timestamps: true }
);
const PaidTimer = mongoose.model('PaidTimer', paidTimerSchema);

export default PaidTimer;
