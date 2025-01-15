import express from 'express';
import {  getAuraPage, UpdateAuraPage } from '../../controllers/Pages/AuraController.js';

const router = express.Router();

router.put('/update/Aura', UpdateAuraPage);
router.get("/getAuraPage", getAuraPage);

export default router;
