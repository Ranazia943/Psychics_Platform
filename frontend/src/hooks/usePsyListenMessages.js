import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import usePsyConversation from "../zustand/usePsyConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const usePsyListenMessages = () => {
  const { socket } = useSocketContext();
  const { appendMessage, selectedConversation } = usePsyConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === selectedConversation?._id) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        appendMessage(newMessage); // Use appendMessage instead of setMessages
      }
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, appendMessage, selectedConversation?._id]);

  return null;
};

export default usePsyListenMessages;