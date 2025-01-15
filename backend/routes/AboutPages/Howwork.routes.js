import express from "express";
import { GetworkPage, UpdateworkPage } from "../../controllers/AboutPages/HowworkConroller.js";

const router = express.Router();

router.put("/update/how_work", UpdateworkPage);
router.get("/how_work", GetworkPage);

export default router;
