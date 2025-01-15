import express from 'express';
import {  createMediumPage, getMediumPage, updateMediumPage } from '../../controllers/Pages/MediumController.js';

const router = express.Router();

router.post('/addmedium', createMediumPage);
router.put('/update/medium', updateMediumPage);
router.get('/getmediumpage', getMediumPage);

export default router;
