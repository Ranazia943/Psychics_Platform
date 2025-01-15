import { useState } from "react";
import { PsyuseAuthContext } from "../context/PsyAuthContext";
import {toast} from "react-toastify";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthPsychics } = PsyuseAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/psychics/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-psychics");
			setAuthPsychics(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
