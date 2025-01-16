import { create } from "zustand";

const usePsyConversation = create((set) => ({
  selectedConversation: null, // Current selected conversation
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation, messages: [] }), // Reset messages when conversation changes

  messages: [], // Array of user messages
  setMessages: (newMessages) => set({ messages: newMessages }), // Replace messages with new messages

  chatRequestStatus: null, // Chat request status (e.g., pending, accepted, rejected)
  setChatRequestStatus: (status) => set({ chatRequestStatus: status }),

  isTyping: false, // Typing status for the conversation
  setTypingStatus: (isTyping) => set({ isTyping }), // Update typing status

  isBusy: false, // Busy status of the conversation
  setIsBusy: (isBusy) => set({ isBusy }), // Set conversation as busy or not
}));

export default usePsyConversation;
