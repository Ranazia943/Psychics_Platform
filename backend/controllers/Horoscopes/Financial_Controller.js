// controllers/Horoscopes/horoscope_controller.js
import Financial from "../../models/Horoscopes/Financialmodel.js";

// Get horoscope data
export const getFinancial = async (req, res) => {
  try {
    const horoscope = await Financial.findOne();
    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }
    res.json(horoscope);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new horoscope data

// Update existing horoscope data
export const updateFinancial = async (req, res) => {
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
    const updatedHoroscope = await Financial.findOneAndUpdate(
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
