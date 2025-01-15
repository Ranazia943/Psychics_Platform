import express from "express";
import { GetParentPage, UpdateParentPage } from "../../controllers/Love_Page/ParentController.js";

const router = express.Router();

router.put("/update/parent", UpdateParentPage);
router.get("/parent", GetParentPage);

export default router;
