import PsyConversations from "./PsyConversations";
import PsyLogoutButtons from "./PsyLogoutButtons";
import PsySearchInput from "./PsySearchInput";

const PsySidebar = () => {
	return (
		<div className="col-12 col-xl-3 ">
		<PsySearchInput />
			<div className='divider px-3'></div>
			<PsyConversations />
			<PsyLogoutButtons />
		</div>
	);
};
export default PsySidebar;
