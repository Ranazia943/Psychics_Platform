import express from "express";
import PsyprotectRoute from "../middleware/PsyprotectRoute.js"; // Replace protectRoute with PsyprotectRoute
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// Route to get users who have chatted with the logged-in psychic, protected by PsyprotectRoute
router.get("/", PsyprotectRoute, getUsersForSidebar);

export default router;
