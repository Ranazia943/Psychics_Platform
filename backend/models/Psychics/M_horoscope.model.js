import mongoose from 'mongoose';

const horoscopeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  experience: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Horoscope = mongoose.model('Monthly_Horoscope', horoscopeSchema);
export default Horoscope;
