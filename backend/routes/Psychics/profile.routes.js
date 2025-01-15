import express from "express";
import {
  addProfile,
  updateProfile,
  fetchpsychicsbyId,
  fetchProfilesByCategory,
  fetchProfile,  toggleStatus,
  addPsychicCompleteProfile,
  searchProfiles, fetchAllProfiles,verifyPsychic
  
} from "../../controllers/Psychics/profile.controller.js";

const router = express.Router();
router.get('/search', searchProfiles);

// Route to add a new profile
router.post("/add", addProfile);

// Route to update a profile by ID
router.put("/update/:id", updateProfile);

// Route to fetch a profile by ID
router.put("/:id/busy", toggleStatus);

router.get("/:id", fetchpsychicsbyId);

router.get("/psy/:id", fetchProfile);

// Route to fetch profiles by category
router.get("/category/:category", fetchProfilesByCategory);
router.post('/addPsychicCompleteProfile', addPsychicCompleteProfile);
router.get('/all', fetchAllProfiles);
router.put('/verify/:id', verifyPsychic);
export default router;
