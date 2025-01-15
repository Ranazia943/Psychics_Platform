import express from "express";
import { getLifePage, updateLifePage } from "../../controllers/Pages/PastlifeController.js";


const router = express.Router();

router.put("/update/Pastlife", updateLifePage);
router.get("/getpast", getLifePage);

export default router;
