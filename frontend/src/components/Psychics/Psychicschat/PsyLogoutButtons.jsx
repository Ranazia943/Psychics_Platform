import { BiLogOut } from "react-icons";
import usePsyLogout from "../../../hooks/usePsyLogout";

const LogoutButton = () => {
	const { loading, logout } = usePsyLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<i class="cis-account-logoutj text-black" onClick={logout}></i>

			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
