import express from "express";
import { GetMartialPage, UpdateMartialPage } from "../../controllers/Love_Page/MartialController.js";

const router = express.Router();

router.put("/update/martial", UpdateMartialPage);
router.get("/martial", GetMartialPage);

export default router;
