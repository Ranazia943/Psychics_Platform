import express from 'express';
import { addRatingCommentAndGift,fetchRatingsByPsychicId } from '../../controllers/Psychics/RatingController.js';

const router = express.Router();

// Route to add a rating and comment
router.post('/add/:psychicId', addRatingCommentAndGift);
router.get('/:psychicId', fetchRatingsByPsychicId);


export default router;
