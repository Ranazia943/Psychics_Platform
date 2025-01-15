import express from "express";
import { addPsychicDetails,updatePsychicDetails,getPsychicDetails } from "../../controllers/Profilestep3.controller.js";

const router = express.Router();

// Route to add psychic details
router.post("/addProfileStep3", addPsychicDetails);
router.put("/update/:psychicId", updatePsychicDetails);
router.get("/profile/:psychicId", getPsychicDetails);

export default router;
