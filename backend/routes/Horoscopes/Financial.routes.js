// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { getFinancial, updateFinancial } from "../../controllers/Horoscopes/Financial_Controller.js";

const router = express.Router();

router.put("/update/financial", updateFinancial);
router.get("/get/financial", getFinancial);

export default router;
