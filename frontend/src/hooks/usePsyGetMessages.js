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
        setMessages(data || []); // Ensure data is an array, default to empty array if undefined
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

  return { messages, loading };
};

export default usePsyGetMessages;
