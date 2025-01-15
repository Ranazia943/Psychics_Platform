import express from "express";
import { GetBreakPage, UpdateBreakPage } from "../../controllers/Love_Page/BreakController.js";

const router = express.Router();

router.put("/update/Break_Page", UpdateBreakPage);
router.get("/Break_Page", GetBreakPage);

export default router;
