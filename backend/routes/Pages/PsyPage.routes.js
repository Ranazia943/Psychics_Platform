import express from "express";
import {
  createPsyPage,
  getPsyPage,
  updatePsyPage,
} from "../../controllers/Pages/PsyPageController.js";

const router = express.Router();

router.post("/Psychic/Page", createPsyPage);
router.put("/update/PsyPage", updatePsyPage); // Remove :id
router.get("/PsyPage", getPsyPage); // Remove :id

export default router;
