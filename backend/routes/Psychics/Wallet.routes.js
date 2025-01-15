import express from 'express';
import { deductWalletBalance } from '../../controllers/Psychics/DeductWalletController.js';

const router = express.Router();

    router.post('/deduct/:psychicId/:userId', deductWalletBalance);

export default router;
