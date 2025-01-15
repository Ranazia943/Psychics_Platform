import { useState } from "react";
import usePsyConversation from "../zustand/usePsyConversation";
import {toast} from "react-toastify";


const usePsySendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = usePsyConversation();

	const sendMessage = async (message) => {
		
		setLoading(true);
		try {
			const res = await fetch(`/api/PsyMessage/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default usePsySendMessage;
