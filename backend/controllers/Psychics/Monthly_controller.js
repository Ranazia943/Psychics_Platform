import Horoscope from '../../models/Psychics/M_horoscope.model.js';

// Create a new Horoscope
export const createHoroscope = async (req, res) => {
  const { name, email, experience } = req.body;

  try {
    const newHoroscope = new Horoscope({ name, email, experience });
    await newHoroscope.save();
    res.status(201).json({ message: 'Horoscope created successfully', horoscope: newHoroscope });
  } catch (error) {
    console.error('Error creating horoscope:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all horoscopes
export const fetchAllHoroscopes = async (req, res) => {
  try {
    const horoscopes = await Horoscope.find();
    res.status(200).json(horoscopes);
  } catch (error) {
    console.error('Error fetching horoscopes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a horoscope by ID
export const deleteHoroscope = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHoroscope = await Horoscope.findByIdAndDelete(id);
    if (!deletedHoroscope) {
      return res.status(404).json({ message: 'Horoscope not found' });
    }
    res.status(200).json({ message: 'Horoscope deleted successfully' });
  } catch (error) {
    console.error('Error deleting horoscope:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
