// routes/Horoscopes/horoscope.routes.js
import express from "express";


import { addSaturn, getSaturn, updateSaturn } from "../../controllers/Horoscopes/Saturn_Contorller.js";

const router = express.Router();

router.post("/add/saturn", addSaturn);
router.put("/update/saturn", updateSaturn);
router.get("/get/saturn", getSaturn);

export default router;
