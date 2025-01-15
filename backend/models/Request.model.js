// models/Request.model.js
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: {
    name: String,
    code: String,
    callingCode: String
  },
  requestType: String,
  message: String
});

const Request = mongoose.model('Request', requestSchema);

export default Request; // Make sure to have this default export
