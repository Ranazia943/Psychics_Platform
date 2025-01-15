import express from "express";
import {
  createChatRequest,
  acceptChatRequest,
  rejectChatRequest,
  getChatRequestsForPsychic,
  checkChatRequestStatus,
} from "../controllers/proposalController.js"; // Correct filename

const router = express.Router();

router.post("/create", createChatRequest);
router.post("/accept/:requestId", acceptChatRequest);
router.post("/reject/:requestId", rejectChatRequest);
router.get("/check/:receiverId", checkChatRequestStatus); // Add the new route

router.get("/chat-psychic/:id", getChatRequestsForPsychic);

export default router;
