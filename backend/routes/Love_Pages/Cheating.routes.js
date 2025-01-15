import express from "express";
import { GetCheatingPage, UpdateCheatingPage } from "../../controllers/Love_Page/CheatingController.js";

const router = express.Router();

router.put("/update/cheating", UpdateCheatingPage);
router.get("/cheating", GetCheatingPage);

export default router;
