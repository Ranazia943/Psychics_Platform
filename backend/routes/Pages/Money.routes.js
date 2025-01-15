import express from "express";

import { getMoneyPage, updateMoneyPage } from "../../controllers/Pages/MoneyController.js";

const router = express.Router();

router.put("/update/Money", updateMoneyPage);
router.get("/GetMoneyPage", getMoneyPage);

export default router;
