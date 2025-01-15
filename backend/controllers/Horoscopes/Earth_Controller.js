// controllers/Horoscopes/horoscope_controller.js
import Earth from "../../models/Horoscopes/Earthmodel.js";

// Get horoscope data
export const getEarth = async (req, res) => {
  try {
    const horoscope = await Earth.findOne();
    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }
    res.json(horoscope);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new horoscope data
export const addEarth = async (req, res) => {
  try {
    const {
      horoscopeBanner,
      daily_date,
      daily_para,
      weekly_date,
      weekly_heading,
      weekly_para,
      monthly_date,
      monthly_para,
      y_heading,
      year,
      generalOverview,
      whatToLookForwardTo,
      whatToWatchOutFor,
      lovePredictions,
      importantDates,
      h2,
      paragraph,
      video,
    } = req.body;
    const newHoroscope = new Earth({
      horoscopeBanner,
      daily_date,
      daily_para,
      weekly_date,
      weekly_heading,
      weekly_para,
      monthly_date,
      monthly_para,
      y_heading,
      year,
      generalOverview,
      whatToLookForwardTo,
      whatToWatchOutFor,
      lovePredictions,
      importantDates,
      h2,
      paragraph,
      video,
    });
    const savedHoroscope = await newHoroscope.save();
    res.json(savedHoroscope);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update existing horoscope data
export const updateEarth = async (req, res) => {
  try {
    const {
      horoscopeBanner,
      daily_date,
      daily_para,
      weekly_date,
      weekly_heading,
      weekly_para,
      monthly_date,
      monthly_para,
      y_heading,
      year,
      generalOverview,
      whatToLookForwardTo,
      whatToWatchOutFor,
      lovePredictions,
      importantDates,
      h2,
      paragraph,
      video,
    } = req.body;
    const updatedHoroscope = await Earth.findOneAndUpdate(
      {},
      {
        horoscopeBanner,
        daily_date,
        daily_para,
        weekly_date,
        weekly_heading,
        weekly_para,
        monthly_date,
        monthly_para,
        y_heading,
        year,
        generalOverview,
        whatToLookForwardTo,
        whatToWatchOutFor,
        lovePredictions,
        importantDates,
        h2,
        paragraph,
        video,
      },
      { new: true, upsert: true }
    );
    res.json(updatedHoroscope);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
