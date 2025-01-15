// usePsyListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import usePsyConversation from "../zustand/usePsyConversation"; // Import psychic conversation store
import notificationSound from "../assets/sounds/notification.mp3";

const usePsyListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = usePsyConversation(); // Get psychic messages

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true; // Optionally add a visual cue for the new message
            const sound = new Audio(notificationSound);
            sound.play();

            // Update psychic messages
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages]); // No need to include messages in dependency array
};

export default usePsyListenMessages;
