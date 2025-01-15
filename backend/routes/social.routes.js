import express from "express";
import { getSocialMedia, updateSocialMedia } from "../controllers/social.controller.js";

const router = express.Router();

// Route to get users who have chatted with the logged-in psychic, protected by PsyprotectRoute
router.get("/get", getSocialMedia);
router.put("/update", updateSocialMedia)
export default router;
