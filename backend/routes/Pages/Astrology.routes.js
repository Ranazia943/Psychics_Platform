import express from "express";
import { getastrologyPage, updateastrologyPage } from "../../controllers/Pages/AstrologyController.js";

const router = express.Router();

router.put("/update/astrology", updateastrologyPage);
router.get("/astrology", getastrologyPage);

export default router;
