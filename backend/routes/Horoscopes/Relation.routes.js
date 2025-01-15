// routes/Horoscopes/horoscope.routes.js
import express from "express";
import { addRelationship, getRelationship, updateRelationship } from "../../controllers/Horoscopes/Relation_Controller.js";

const router = express.Router();

router.post("/add/relation", addRelationship);
router.put("/update/relation", updateRelationship);
router.get("/get/relation", getRelationship);

export default router;
