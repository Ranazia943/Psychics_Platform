import express from "express";
import { getMediumPage, updateMediumPage } from "../../controllers/Pages/MediumController.js";

const router = express.Router();

router.put("/update/medium", updateMediumPage);
router.get("/medium", getMediumPage);

export default router;
