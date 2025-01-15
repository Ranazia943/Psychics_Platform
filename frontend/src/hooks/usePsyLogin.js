import { useState } from "react";
import {toast} from "react-toastify";
import { PsyuseAuthContext } from "../context/PsyAuthContext";

const usePsyLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthPsychics } = PsyuseAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/psychics/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-psychics", JSON.stringify(data));
			setAuthPsychics(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default usePsyLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
