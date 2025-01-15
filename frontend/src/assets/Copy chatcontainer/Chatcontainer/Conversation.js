import React from 'react'
import useConversation from "../../zustand/useConversation"
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

  return (
    
    <a href="#" className={`list-group-item list-group-item-action border-0 ${isSelected ? "bg-orange" : ""}`}onClick={() => setSelectedConversation(conversation)}>
				

    <div className="badge bg-green float-right">5fjlsadflasdjflsdjlfls</div>

    <div className={`d-flex avatar ${isOnline ? "online" : ""}`}>
      <img src={conversation.profilePic} className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
      <div className="flex-grow-1 ml-3">
      {conversation.username}
      
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
      </div>
    </div>
  </a>

  )
}

export default Conversation
