import express from 'express';
import { createHoroscope, deleteHoroscope, fetchAllHoroscopes } from '../../controllers/Psychics/Monthly_controller.js';

const router = express.Router();

// Create a new horoscope
router.post('/horoscope', createHoroscope);

// Fetch all horoscopes
router.get('/horoscopes', fetchAllHoroscopes);

// Delete a horoscope by ID
router.delete('/horoscope/:id', deleteHoroscope);

export default router;
