import express from "express";
import {
  getMessages,
  sendMessage,
  getUsersWhoChatted,
  UsersWhoChatted,
  getUserAndPsychicDetails,
  getAllConversationsByAdmin,
  deleteConversationById,
  
  
  
} from "../controllers/message.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
import PsyprotectRoute from "../middleware/PsyprotectRoute.js";
import AdminProtectRoute from "../middleware/AdminProtectRoute.js";

const router = express.Router();

// Existing routes
router.get("/:id", ProtectRoute, getMessages);
router.post("/send/:id", ProtectRoute, sendMessage);
router.get("/users-chatted/:id", getUsersWhoChatted);
router.get("/users", UsersWhoChatted);
router.get('/user-and-psychic-details/:conversationId',  ProtectRoute,PsyprotectRoute, getUserAndPsychicDetails);
// New routes for timer functionality
// In your message.routes.js file
router.post('/conversations',AdminProtectRoute, getAllConversationsByAdmin);
router.delete('/conversations/:conversationId', AdminProtectRoute, deleteConversationById);

export default router;
