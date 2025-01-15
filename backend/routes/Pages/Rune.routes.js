import express from "express";
import { getRunePage, updateRunePage } from "../../controllers/Pages/RuneController.js";

const router = express.Router();

router.put("/update/rune", updateRunePage);
router.get("/rune", getRunePage);

export default router;
