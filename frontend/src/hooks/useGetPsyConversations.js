import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { toast } from "react-toastify";

const useGetPsyConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { socket } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();

    // Listen for newConversation events
    socket?.on("newConversation", (newConversation) => {
      setConversations((prev) => [...prev, newConversation]);
    });

    // Listen for newMessage events to update the conversation list with senderProfile
    socket?.on("newMessage", ({ senderProfile }) => {
      setConversations((prev) => {
        const existingConversation = prev.find(
          (conv) => conv._id === senderProfile._id
        );
        if (!existingConversation) {
          // Add the new user to the conversation list
          return [...prev, senderProfile];
        }
        return prev;
      });
    });

    return () => {
      socket?.off("newConversation");
      socket?.off("newMessage");
    };
  }, [socket]);

  return { loading, conversations };
};

export default useGetPsyConversations;