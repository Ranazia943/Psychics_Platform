// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { addAstro, getAstro, updateAstro } from "../../controllers/Horoscopes/Astro_Controller.js";

const router = express.Router();

router.post("/add/Astro", addAstro);
router.put("/update/Astro", updateAstro);
router.get("/get/Astro", getAstro);

export default router;
