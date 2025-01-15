import express from "express";
import { GetCareerPage, UpdateCareerPage } from "../../controllers/Pages/CareerController.js";

const router = express.Router();

router.put("/update/career", UpdateCareerPage);
router.get("/career", GetCareerPage);

export default router;
