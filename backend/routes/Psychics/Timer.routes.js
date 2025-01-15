import express from "express";
import {
  sendFreeTimerRequest,
  acceptFreeTimerRequest,
  rejectFreeTimerRequest,
  fetchFreeTimerInRunningState,
  fetchFreeTimerRequestsForPsychic
} from "../../controllers/Psychics/TimerController.js";

const router = express.Router();

// Route to request a free timer
router.post("/request/:psychicId", sendFreeTimerRequest);

// Route to accept a free timer request by ID
router.patch("/accept/:requestId", acceptFreeTimerRequest);

// Route to reject a free timer request by ID
router.patch("/reject/:requestId", rejectFreeTimerRequest);

// Route to fetch the state of a running free timer for a user and psychic
router.get("/state/:userId/:psychicId", fetchFreeTimerInRunningState);

// Route to fetch all pending free timer requests for a specific psychic
router.get("/requests/:psychicId", fetchFreeTimerRequestsForPsychic);

export default router;
