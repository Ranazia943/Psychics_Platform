import { useEffect, useState } from "react";
import usePsyConversation from "../zustand/usePsyConversation";
import { toast } from "react-toastify";

const usePsyGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = usePsyConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/PsyMessage/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(Array.isArray(data) ? data : []); // Replace messages with new data
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    } else {
      setMessages([]); // Reset messages if no conversation is selected
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages: Array.isArray(messages) ? messages : [], loading }; // Ensure messages is always an array
};

export default usePsyGetMessages;