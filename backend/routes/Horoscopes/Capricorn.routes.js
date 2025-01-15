// routes/Horoscopes/horoscope.routes.js
import express from "express";

import { addCapricorn, getCapricorn, updateCapricorn } from "../../controllers/Horoscopes/Capricorn_Controller.js";

const router = express.Router();

router.post("/add/capricorn", addCapricorn);
router.put("/update/capricorn", updateCapricorn);
router.get("/get/capricorn", getCapricorn);

export default router;
