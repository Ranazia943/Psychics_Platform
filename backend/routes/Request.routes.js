import express from "express";
import { createRequest, deleteRequest, getAllRequests, getCountries, getPhoneCodes } from "../controllers/Request.controller.js";

const router = express.Router();

router.get('/countries', getCountries);
router.get('/phonecodes', getPhoneCodes);
router.post('/requests', createRequest);
router.get('/fetchallrequest', getAllRequests)
router.delete('/requests/:id', deleteRequest);

export default router;
