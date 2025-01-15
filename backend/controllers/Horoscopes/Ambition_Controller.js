// controllers/Horoscopes/horoscope_controller.js
import Ambition from "../../models/Horoscopes/Ambitionmodel.js";

// Get horoscope data
export const getAmbition = async (req, res) => {
  try {
    const horoscope = await Ambition.findOne();
    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }
    res.json(horoscope);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new horoscope data
export const addAmbition = async (req, res) => {
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
    const newHoroscope = new Ambition({
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
export const updateAmbition = async (req, res) => {
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
    const updatedHoroscope = await Ambition.findOneAndUpdate(
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
