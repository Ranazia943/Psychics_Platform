import express from "express";
import { getPsychicsForSidebar } from "../controllers/psychics.controller.js";
import PsyprotectRoute from "../middleware/PsyprotectRoute.js";

const router = express.Router();

router.get("/", PsyprotectRoute, getPsychicsForSidebar);

export default router;
