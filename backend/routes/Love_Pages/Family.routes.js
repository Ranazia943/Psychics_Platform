import express from "express";
import { GetFamilyPage, UpdateFamilyPage } from "../../controllers/Love_Page/FamilyController.js";

const router = express.Router();

router.put("/update/family", UpdateFamilyPage);
router.get("/family", GetFamilyPage);

export default router;
