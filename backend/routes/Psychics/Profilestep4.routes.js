import express from "express";
import { addProfileStep4 ,fetchProfileById,updateProfileById} from "../../controllers/Profilestep4.controller.js";

const router = express.Router();

// Route to handle adding profile step 4 details
router.post("/addProfileStep4", addProfileStep4);
router.get('/profile/:psychicId', fetchProfileById);
router.put('/update/:psychicId', updateProfileById);

export default router;
