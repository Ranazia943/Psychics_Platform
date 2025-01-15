import express from "express";
import {
  CreatePetPage,
  getPage,
  UpdatePetPage,
} from "../../controllers/Pages/PetController.js";

const router = express.Router();

router.post("/PetPage", CreatePetPage);
router.put("/update/Pet", UpdatePetPage);
router.get("/getpetpage", getPage);

export default router;
