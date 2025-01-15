import express from "express";
import { GetHelpPage, UpdateHelpPage } from "../../controllers/AboutPages/HelpController.js";

const router = express.Router();

router.put("/update/help", UpdateHelpPage);
router.get("/help", GetHelpPage);

export default router;
