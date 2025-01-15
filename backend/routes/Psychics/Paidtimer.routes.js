import express from 'express';
import {
  requestPaidTimer,
  fetchPendingRequests,
  acceptRejectRequest,
  fetchRequestStatus,
  startPaidTimer,
  fetchRunningTimer,endPaidTimer,fetchTotalTimeSpent,fetchAllTimeEarningsPsychic,fetchTotalTimePsychic,fetchTotalEarningsPsychic
} from '../../controllers/Psychics/PaidtimerController.js';

const router = express.Router();

router.post('/request', requestPaidTimer);
router.get('/requests/:psychicId', fetchPendingRequests);
router.post('/accept-reject', acceptRejectRequest);
router.get('/status/:timerId', fetchRequestStatus);
router.post('/start', startPaidTimer);
router.get('/running/:timerId', fetchRunningTimer);

router.post('/end', endPaidTimer); // End the paid timer
router.get('/total-time-spent/:timerId', fetchTotalTimeSpent); // Fetch total time spent
router.get('/:psychicId/total-time', fetchTotalTimePsychic);
router.get('/:psychicId/total-earning', fetchTotalEarningsPsychic);
router.get('/:psychicId/all-time-earnings', fetchAllTimeEarningsPsychic);

export default router;
