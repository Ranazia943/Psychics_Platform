import { create } from "zustand";
const usePsyConversation = create((set) => ({
<<<<<<< HEAD
  // Current selected conversation
  selectedConversation: null,

  // Set the selected conversation and reset messages
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation, messages: [] }),
=======
  selectedConversation: null, // Current selected conversation
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation, messages: [] }), // Reset messages when conversation changes

  messages: [], // Array of user messages
  setMessages: (newMessages) => set({ messages: newMessages }), // Replace messages with new messages
>>>>>>> b42acbee9514d14bef453ef8bbf7a4b984cf2bbc

  // Array of user messages
  messages: [],

  // Replace messages with new messages
  setMessages: (newMessages) => set({ messages: newMessages }),

  // Append a new message to the existing messages
  appendMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),

  // Chat request status (e.g., pending, accepted, rejected)
  chatRequestStatus: null,

  // Set the chat request status
  setChatRequestStatus: (status) => set({ chatRequestStatus: status }),

  // Typing status for the conversation
  isTyping: false,

  // Update typing status
  setTypingStatus: (isTyping) => set({ isTyping }),

  // Busy status of the conversation
  isBusy: false,

  // Set conversation as busy or not
  setIsBusy: (isBusy) => set({ isBusy }),

  // Array of users in the chat
  users: [],

  // Add a user to the chat list
  addUserToChat: (user) => {
    set((state) => ({
      users: [...state.users, user], // Add the new user to the existing users array
    }));
  },
}));


export default usePsyConversation;