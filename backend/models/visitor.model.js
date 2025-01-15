import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  browser: String,
  version: String,
  os: String,
  platform: String,
  engine: String,
  ipAddress: String,
  visitedAt: {
    type: Date,
    default: Date.now
  }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
