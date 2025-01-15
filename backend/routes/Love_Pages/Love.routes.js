import express from "express";
import { getLovePageDetails, updateLovePageDetails } from "../../controllers/Love_Page/LoveController.js";

const router = express.Router();

router.put("/update/Love_Page", updateLovePageDetails);
router.get("/love_Page", getLovePageDetails);

export default router;
