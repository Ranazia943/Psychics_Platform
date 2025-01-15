import express from "express";
import { addProfileStep2,getPsychicById ,updateProfileStep2,fetchProfileStep2,fetchProfilesByCategory} from "../../controllers/Profilestep2.controller.js";

const router = express.Router();

// Route to handle adding profile step 2 details
router.post("/addProfileStep2", addProfileStep2);
router.put('/update/:Psychics', updateProfileStep2);
router.get('/profile/:profileId', fetchProfileStep2);
router.get("/category/:category", fetchProfilesByCategory);
router.get("/:psychicId", getPsychicById);

export default router;
