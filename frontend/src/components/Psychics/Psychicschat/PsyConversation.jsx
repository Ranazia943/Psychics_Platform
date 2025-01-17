import React from "react";
import { useSocketContext } from "../../../context/SocketContext";
import usePsyConversation from "../../../zustand/usePsyConversation";

const PsyConversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation, setTypingStatus } =
    usePsyConversation();
  const { onlineUsers, lastSeenTimes, typingUsers, socket } =
    useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  const isTyping = typingUsers.includes(conversation._id);
  const lastSeen = lastSeenTimes[conversation._id];

  const formatLastSeenTime = (lastSeen) => {
    if (!lastSeen) return "";
    const date = new Date(lastSeen);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `Last seen at ${formattedHours}:${minutes} ${ampm}`;
  };

  const handleClick = () => {
    setSelectedConversation(conversation);
    if (socket) {
      setTypingStatus(true);
    }
  };

  // Ensure conversation has valid username and profilePic
  if (!conversation.username || !conversation.profilePic) {
    return null; // Skip rendering if data is invalid
  }

  return (
    <a
      href="#"
      className={`list-group-item list-group-item-action border-0 ${
        isSelected ? "text-white" : "bg-light"
      }`}
      onClick={handleClick}
      style={{
        backgroundColor: isSelected ? "rgb(163, 12, 173)" : "",
        textDecoration: "none",
      }}
    >
      <div className="d-flex align-items-center">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <img
            src={conversation.profilePic}
            className="rounded-circle mr-1"
            alt={conversation.username}
            width={40}
            height={40}
          />
        </div>
        <div className="flex-grow-1 ml-3">
          <div
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              display: "block",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              {conversation.username}
            </span>
          </div>
          {isOnline ? (
            <span className="badge badge-success ml-2" style={{ fontSize: "12px" }}>
              Online
            </span>
          ) : lastSeen ? (
            <span className="badge badge-secondary ml-2" style={{ fontSize: "12px" }}>
              {formatLastSeenTime(lastSeen)}
            </span>
          ) : (
            <span className="badge badge-primary ml-2" style={{ fontSize: "12px" }}>
              Offline
            </span>
          )}
          {isTyping && <div className="typing-indicator">Typing...</div>}
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </a>
  );
};

export default PsyConversation;