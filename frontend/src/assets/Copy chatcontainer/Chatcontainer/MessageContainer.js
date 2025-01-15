import React ,{useEffect} from 'react'
import useConversation from '../../zustand/useConversation';
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from '../../context/AuthContext';
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		
		<div className="py-2 px-4 border-bottom d-none d-lg-block">
{!selectedConversation ? (
				<NoChatSelected />
			) : (
  <>
		<div className="d-flex align-items-center py-1">
		  <div className="position-relative">
			<img src={selectedConversation.profilePic} className="rounded-circle mr-1" alt="Sharon Lessman" width={40} height={40} />
		  </div>
		  <div className="container-fluid">
    <div className="row">
        <div className="col-md-6">
            <span className='label-text font-bold'><label style={{fontSize:'18px', fontWeight:'500', color:'orange'}}>To:</label></span>{" "}
            <span>{selectedConversation.username}</span>
            <br />
            <span><label style={{fontSize:'18px', fontWeight:'500', color:'orange'}}>Role:</label> {selectedConversation.role}</span>
        </div>
        <div className="col-md-6">
            <span> <label style={{fontSize:'18px', fontWeight:'500', color:'orange'}}>Abilities:</label> <span> Expert in Love Relation</span></span>
			<span className="eye" style={{ marginLeft: '20px', fontSize: '18px', fontWeight: '500', color: 'black' }}>
    👁️
    <div className="text-muted small">Typing...</div>
</span>

        </div>
    </div>
</div>

<div>
  
			<button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></button>
           <br/><br/>
			<button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7" /><rect x={1} y={5} width={15} height={14} rx={2} ry={2} /></svg></button>
			
		  </div>
          </div>
		
		<Messages />
					<MessageInput />
		</>
)}
	  </div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();

    // Check if authUser exists before accessing its properties
    if (!authUser) {
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                    <p>Welcome 👋</p>
                    <p>Select a chat to start messaging</p>
                    <TiMessages className='text-3xl md:text-6xl text-center' />
                </div>
            </div>
        );
    }

    // If authUser exists, render the component with the username
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.username} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
