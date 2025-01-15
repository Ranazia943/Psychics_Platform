import express from "express";
import { addProfileStep5 ,updateProfileStep5,getProfileStep5} from "../../controllers/Profilestep5.controller.js";

const router = express.Router();

// Route to handle adding profile step 5 details
router.post("/addProfileStep5", addProfileStep5);
router.put('/update/:psychicId', updateProfileStep5);
router.get('/profile/:psychicId', getProfileStep5);


export default router;
