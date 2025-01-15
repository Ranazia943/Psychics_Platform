import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  chatRequestStatus: null,
  isBusy: false,

  // Set selected conversation and update busy status
  setSelectedConversation: (conversation) => 
    set({ selectedConversation: conversation, isBusy: conversation ? true : false }),

  // Set messages for the conversation
  setMessages: (messages) => set({ messages }),

  // Set chat request status
  setChatRequestStatus: (status) => set({ chatRequestStatus: status }),

  // Set typing status and adjust busy state
  setTypingStatus: (isTyping) => set({ isBusy: isTyping }),
}));

export default useConversation;
