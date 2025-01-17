import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [""],
    methods: ["GET", "POST"],
  },
});
                                                                           
const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  // Listen for new messages
  socket.on("sendMessage", async (message) => {
    // Save the message to the database
    const newMessage = await saveMessageToDatabase(message);

    // Emit the new message to the recipient
    io.to(message.conversationId).emit("newMessage", newMessage);

    // Emit an update to the conversations list
    const updatedConversations = await getUpdatedConversations();
    io.emit("updateConversations", updatedConversations);
  });
});
// Handle real-time events and updates
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
        break;
      }
    }
  });

});

export { app, io, server, getReceiverSocketId };
