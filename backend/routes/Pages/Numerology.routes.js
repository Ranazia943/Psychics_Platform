import express from "express";
import { getNumerologyPage, updateNumerologyPage } from "../../controllers/Pages/NumerologyController.js";

const router = express.Router();

router.put("/update/numerology", updateNumerologyPage);
router.get("/numerology", getNumerologyPage);

export default router;
