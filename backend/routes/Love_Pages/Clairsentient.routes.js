import express from "express";
import { GetClairsetientPage, UpdateClairsetientPage } from "../../controllers/Love_Page/Clairsentient_Controller.js";

const router = express.Router();

router.put("/update/clair_sentient", UpdateClairsetientPage);
router.get("/clair_sentient", GetClairsetientPage);

export default router;
