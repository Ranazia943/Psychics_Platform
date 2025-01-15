// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { addgoal, getgoal, updategoal } from "../../controllers/Horoscopes/Goals_Controller.js";

const router = express.Router();

router.post("/add/goal", addgoal);
router.put("/update/goal", updategoal);
router.get("/get/goal", getgoal);

export default router;
