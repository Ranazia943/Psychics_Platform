import express from "express";
import { GetPersonPage, UpdatePersonPage } from "../../controllers/Pages/MissPersonController.js";

const router = express.Router();

router.put("/update/Person", UpdatePersonPage);
router.get("/getPerson", GetPersonPage);

export default router;
