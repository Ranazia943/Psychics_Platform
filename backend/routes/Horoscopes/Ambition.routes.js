// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { addAmbition, getAmbition, updateAmbition } from "../../controllers/Horoscopes/Ambition_Controller.js";


const router = express.Router();

router.post("/add/ambition", addAmbition);
router.put("/update/ambition", updateAmbition);
router.get("/get/ambition", getAmbition);

export default router;
