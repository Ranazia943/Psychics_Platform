import express from "express";
import {
  fetchProfile,
  updateProfile,
  psy_login,
  psy_logout,
  psy_signup,
  getAllPsychics,
  deletePsychicById,
  addPsychicProfile,
  getTotalPsychicsCount,getPsychicStatus,updatePsychicStatus
 
} from "../controllers/psyauth.controller.js";

const router = express.Router();

router.post("/signup", psy_signup);

router.post("/login", psy_login);
router.post ("/profile/:id", fetchProfile);
router.post("/logout", psy_logout);
router.put("/update/:id", updateProfile);

router.get('/all', getAllPsychics);
router.delete("/psychic/:id", deletePsychicById);
router.post("/add", addPsychicProfile);
router.get("/total",getTotalPsychicsCount )
router.get("/:psychicId/status", getPsychicStatus);
router.put("/:psychicId/status", updatePsychicStatus);

export default router;  
