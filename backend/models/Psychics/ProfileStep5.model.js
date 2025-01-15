import mongoose from 'mongoose';

// Schema for Time Slots with Day
const TimeSlotSchema = new mongoose.Schema({
  day: {
    type: String, // Day of the week, e.g., 'Sunday', 'Monday', etc.
    required: true,
  },
  fromTime: {
    type: String, // Example: "08:00 AM"
    required: true,
  },
  toTime: {
    type: String, // Example: "10:00 AM"
    required: true,
  },
});

// ProfileStep5 Schema
const ProfileStep5Schema = new mongoose.Schema(
  {
    psychicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Psychics",
      required: true,
    },
    availability: [TimeSlotSchema],
  },
  { timestamps: true }
);

const ProfileStep5 = mongoose.model("ProfileStep5", ProfileStep5Schema);

export default ProfileStep5;
