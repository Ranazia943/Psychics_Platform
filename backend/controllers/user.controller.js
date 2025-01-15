import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInPsychicId = req.psychics._id;

    // Find all conversations where the logged-in psychic is a participant
    const conversations = await Conversation.find({
      participants: loggedInPsychicId,
    }).populate("participants", "-password"); // Exclude password from participants

    // Collect unique users who have chatted with the psychic
    const users = new Set();
    conversations.forEach((convo) => {
      convo.participants.forEach((participant) => {
        if (participant._id.toString() !== loggedInPsychicId.toString()) {
          users.add(participant); // Add other users (not the psychic) to the set
        }
      });
    });

    // Convert Set to Array and return the list of users
    const userList = Array.from(users);

    res.status(200).json(userList);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



// controllers/userController.js

