// routes/Horoscopes/horoscope.routes.js
import express from "express";
import {
  addHoroscopes,
  getHoroscopes,
  updateHoroscopes,
} from "../../controllers/Horoscopes/horoscope_controller.js";

const router = express.Router();

router.post("/add/horoscopes", addHoroscopes);
router.put("/update/horoscopes", updateHoroscopes);
router.get("/get/horoscopes", getHoroscopes);

export default router;
