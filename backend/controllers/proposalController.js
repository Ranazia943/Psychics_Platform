// controllers/chatRequestController.js
import ChatRequest from "../models/Proposal.model.js";

// Create a new chat request
export const createChatRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const chatRequest = new ChatRequest({
      sender: senderId,
      receiver: receiverId,
    });
    await chatRequest.save();
    res.status(201).json({ message: "Chat request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a chat request
export const acceptChatRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const chatRequest = await ChatRequest.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(chatRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a chat request
export const rejectChatRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const chatRequest = await ChatRequest.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(chatRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get chat requests for a specific psychic
export const getChatRequestsForPsychic = async (req, res) => {
  const { id } = req.params;
  try {
    const chatRequests = await ChatRequest.find({ receiver: id }).populate(
      "sender",
      "username"
    );
    // Debugging line
    res.json(chatRequests);
  } catch (error) {
    console.error("Error fetching chat requests:", error); // Debugging line
    res.status(500).json({ message: "Failed to fetch chat requests." });
  }
};


export const checkChatRequestStatus = async (req, res) => {
  const { receiverId } = req.params;
  const { senderId } = req.user; // Assuming you are using middleware to set req.user with authenticated user's ID

  try {
    const chatRequest = await ChatRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (chatRequest) {
      res.status(200).json({ status: chatRequest.status });
    } else {
      res.status(200).json({ status: "no_request" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check chat request status." });
  }
};