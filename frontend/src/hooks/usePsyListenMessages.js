import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import usePsyConversation from "../zustand/usePsyConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const usePsyListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = usePsyConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default usePsyListenMessages;
