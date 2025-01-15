import express from "express";
import {
  getFAQs,
  updateFAQs,
} from "../../controllers/AboutPages/FaqController.js";

const router = express.Router();

router.get("/faqs", getFAQs);
router.put("/update/faqs", updateFAQs);

export default router;
