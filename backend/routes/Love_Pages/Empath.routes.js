import express from "express";
import { GetEmpathPage, UpdateEmpathPage } from "../../controllers/Love_Page/EmpathController.js";

const router = express.Router();

router.put("/update/empath", UpdateEmpathPage);
router.get("/empath", GetEmpathPage);

export default router;
