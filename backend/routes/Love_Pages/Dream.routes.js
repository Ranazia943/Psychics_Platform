import express from "express";
import { GetDreamPage, UpdateDreamPage } from "../../controllers/Love_Page/DreamController.js";

const router = express.Router();

router.put("/update/dream", UpdateDreamPage);
router.get("/dream", GetDreamPage);

export default router;
