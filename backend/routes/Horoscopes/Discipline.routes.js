// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { addDiscipline, getDiscipline, updateDiscipline } from "../../controllers/Horoscopes/Discipline_Controller.js";


const router = express.Router();

router.post("/add/discipline", addDiscipline);
router.put("/update/discipline", updateDiscipline);
router.get("/get/discipline", getDiscipline);

export default router;
