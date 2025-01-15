import express from "express";
import {
  CreateCrystalPage,
  getCrystalPage,
  UpdateCrystalPage,
} from "../../controllers/Pages/CrystalController.js";

const router = express.Router();

router.post("/crystal", CreateCrystalPage);
router.put("/update/crystal", UpdateCrystalPage); // No id parameter
router.get("/getcrystal", getCrystalPage);

export default router;
