import express from "express";
import { GetAboutPage, UpdateAboutPage } from "../../controllers/AboutPages/AboutController.js";

const router = express.Router();

router.put("/update/about", UpdateAboutPage);
router.get("/about", GetAboutPage);

export default router;
