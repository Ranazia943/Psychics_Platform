import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import User from '../models/user.model.js';  // Ensure the path is correct
import Profile from '../models/Psychics/Profile.model.js';  // Ensure the path is correct
import mongoose from 'mongoose';


export const sendMessage = async (req, res) => {
  try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      let senderId;

      if (req.psychics) {
          senderId = req.psychics._id;
      } else if (req.user) {
          senderId = req.user._id;
      }

      let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
          conversation = await Conversation.create({
              participants: [senderId, receiverId],
          });
      }

      const newMessage = new Message({
          senderId,
          receiverId,
          message,
      });

      conversation.messages.push(newMessage._id);
      await Promise.all([conversation.save(), newMessage.save()]);

      // Emit the new message to the receiver
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
  } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
      const { id: userToChatId } = req.params;

      let senderId;
      if (req.psychics) {
          senderId = req.psychics._id;
      } else if (req.user) {
          senderId = req.user._id;
      }

      // Validate ObjectIds
      if (!mongoose.Types.ObjectId.isValid(userToChatId) || !mongoose.Types.ObjectId.isValid(senderId)) {
          return res.status(400).json({ error: "Invalid user ID" });
      }

      console.log(`Sender ID: ${senderId}, User to Chat ID: ${userToChatId}`);

      const conversation = await Conversation.findOne({
          participants: { $all: [senderId, userToChatId] },
      }).populate("messages"); // Populate actual messages

      if (!conversation) return res.status(200).json([]);

      const messages = conversation.messages;

      res.status(200).json(messages);
  } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};


export const UsersWhoChatted = async (req, res) => {
  try {
    let loggedInPsychicId;

    // Ensure the logged-in user is a psychic
    if (req.psychics) {
      loggedInPsychicId = req.psychics._id;
    } else {
      return res
        .status(403)
        .json({ error: "Access denied. Only psychics can access this data." });
    }

    // Find all conversations where the logged-in psychic is a participant
    const conversations = await Conversation.find({
      participants: loggedInPsychicId,
    }).populate("participants", "-password"); // Populate participants but exclude passwords

    // Extract unique users who have chatted with the logged-in psychic
    const users = new Set();
    conversations.forEach((convo) => {
      convo.participants.forEach((participant) => {
        if (participant._id.toString() !== loggedInPsychicId.toString()) {
          users.add(participant); // Add other users to the set
        }
      });
    });

    // Convert the Set to an Array
    const userList = Array.from(users);

    res.status(200).json(userList);
  } catch (error) {
    console.log("Error in UsersWhoChatted controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getUsersWhoChatted = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants");

    // Extract all participants (excluding the current user)
    const users = new Set();
    conversations.forEach((convo) => {
      convo.participants.forEach((participant) => {
        if (participant._id.toString() !== userId) {
          users.add(participant);
        }
      });
    });

    // Convert set to array
    const userList = Array.from(users);

    res.status(200).json(userList);
  } catch (error) {
    console.log("Error in getUsersWhoChatted controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserAndPsychicDetails = async (req, res) => {
  try {
    const { conversationId } = req.params;
    console.log(`Fetching details for conversationId: ${conversationId}`);

    // Step 1: Fetch the conversation by its ID
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      console.log('Conversation not found');
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Step 2: Extract participants
    const [userId, psychicId] = conversation.participants;
    console.log(`Participants - userId: ${userId}, psychicId: ${psychicId}`);

    // Step 3: Fetch user's wallet balance
    const user = await User.findById(userId).select('walletBalance');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const walletBalance = user.walletBalance;
    console.log(`User wallet balance: ${walletBalance}`);

    // Step 4: Fetch psychic's profile to get ratePM
    const psychicProfile = await Profile.findOne({ Psychics: psychicId }).select('chargesPerMin'); // Correct field name
    if (!psychicProfile) {
      console.log('Psychic profile not found');
      return res.status(404).json({ error: 'Psychic profile not found' });
    }

    const psychicRatePM = psychicProfile.chargesPerMin;
    console.log(`Psychic rate per minute: ${psychicRatePM}`);

    // Step 5: Return both wallet balance and rate per minute (ratePM)
    return res.status(200).json({
      walletBalance,
      psychicRatePM
    });

  } catch (error) {
    console.error('Error in getUserAndPsychicDetails controller:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const getAllConversationsByAdmin = async (req, res) => {
  console.log("Admin is fetching paginated conversations");
  try {
    const { adminId, page = 1, limit = 6 } = req.body;

    // Validate admin ID
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }

    // Ensure the user is an admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. Only admins can access this data." });
    }

    // Pagination logic
    const skip = (page - 1) * limit;

    // Fetch conversations and populate participants and messages
    const conversations = await Conversation.find()
    .populate({
      path: 'messages',
      model: Message,
      populate: [
        {
          path: 'senderId',
          model: 'User', // Explicitly use 'User' model
          select: 'username profilePic',
        },
        {
          path: 'receiverId',
          model: 'Psychics', // Explicitly use 'Psychics' model
          select: 'username profileImage',
        }
      ]
    })
    
      .skip(skip)
      .limit(limit);

    // Get total number of conversations for pagination
    const totalConversations = await Conversation.countDocuments();

    if (!conversations || conversations.length === 0) {
      console.log("No conversations found");
      return res.status(404).json({ error: "No conversations found" });
    }

    // Prepare response by ensuring both user and psychic details are included in participants
    const modifiedConversations = conversations.map(conversation => ({
      ...conversation.toObject(),
      messages: conversation.messages.map(message => ({
        senderId: message.senderId,   // Sender details
        receiverId: message.receiverId, // Receiver details
        message: message.message,    // Message content
        createdAt: message.createdAt,
      })),
    }));

    // Send the response with paginated results
    res.status(200).json({
      conversations: modifiedConversations,
      totalPages: Math.ceil(totalConversations / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("Error in getAllConversationsByAdmin controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteConversationById = async (req, res) => {
  try {
      const { conversationId } = req.params;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
          return res.status(400).json({ error: "Invalid conversation ID" });
      }

      // Find and delete the conversation
      const conversation = await Conversation.findByIdAndDelete(conversationId);
      if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
      }

      // Optionally, you can also delete all messages related to this conversation
      await Message.deleteMany({ _id: { $in: conversation.messages } });

      console.log(`Deleted conversation with ID: ${conversationId}`);
      
      res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
      console.error("Error in deleteConversationById controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};

