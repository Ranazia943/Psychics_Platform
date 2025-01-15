import express from "express";
import { GetClarivoyantPage, UpdateClarivoyantPage } from "../../controllers/Love_Page/Clarivoyant_Controller.js";

const router = express.Router();

router.put("/update/clair_voyant", UpdateClarivoyantPage);
router.get("/clair_voyant", GetClarivoyantPage);

export default router;
