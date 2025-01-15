// controllers/Request.controller.js
import fs from 'fs';
import path from 'path';
import Request from '../models/Request.model.js';

// Load JSON data
const countries = JSON.parse(fs.readFileSync(path.resolve('Json data/Countries.json')));
const phoneCodes = JSON.parse(fs.readFileSync(path.resolve('Json data/Cellno.json')));

// Get list of countries
export const getCountries = (req, res) => {
  res.json(countries);
};

// Get list of phone codes
export const getPhoneCodes = (req, res) => {
  res.json(phoneCodes);
};

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const { name, email, phone, country, requestType, message } = req.body;

    // Validate the country
    const countryData = countries.find(c => c.code === country);
    if (!countryData) {
      return res.status(400).json({ error: 'Invalid country code.' });
    }

    // Validate the phone number and find the calling code from cellno.json
    const phoneCodeData = phoneCodes.find(pc => pc.code === country);
    if (!phoneCodeData) {
      return res.status(400).json({ error: 'Phone code not found for the given country.' });
    }

    // Create the request object with full country and phone code data
    const newRequest = new Request({
      name,
      email,
      phone: `${phoneCodeData.callingCode}${phone}`, // Combine calling code and phone number
      country: {
        name: countryData.name,
        code: countryData.code,
        callingCode: phoneCodeData.callingCode // Use calling code from cellno.json
      },
      requestType,
      message
    });

    // Save the request to the database
    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};


export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find(); // Fetch all requests from the database
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};
// Delete a request by ID
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the request by ID
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    res.status(200).json({ success: true, message: 'Request deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};
