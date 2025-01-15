// routes/Horoscopes/horoscope.routes.js
import express from "express";

import { addPractical, getPractical, updatePractical } from "../../controllers/Horoscopes/Practical_Controller.js";

const router = express.Router();

router.post("/add/practical", addPractical);
router.put("/update/practical", updatePractical);
router.get("/get/practical", getPractical);

export default router;
