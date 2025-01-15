import express from "express";
import { GetPricingPage, UpdatePricingPage } from "../../controllers/AboutPages/PricingController.js";

const router = express.Router();

router.put("/update/pricing", UpdatePricingPage);
router.get("/pricing", GetPricingPage);

export default router;
