// routes/Horoscopes/horoscope.routes.js
import express from "express";

import { addEarth, getEarth, updateEarth } from "../../controllers/Horoscopes/Earth_Controller.js";

const router = express.Router();

router.post("/add/earth", addEarth);
router.put("/update/earth", updateEarth);
router.get("/get/earth", getEarth);

export default router;
