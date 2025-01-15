import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import axios from "axios";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [status, setStatus] = useState("offline"); // State to track the psychic's status

  // Check if the conversation is selected
  const isSelected = selectedConversation?._id === conversation._id;

  // Handle click on conversation
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedConversation(conversation);
  };

  // Fetch the psychic's status from the backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `/api/psychics/${conversation._id}/status`
        );
        if (response.status === 200) {
          setStatus(response.data.status); // Update the status state
        }
      } catch (error) {
        console.error("Error fetching psychic status:", error);
      }
    };

    fetchStatus();

    // Optional: Polling interval for updates (e.g., every 5 seconds)
    const interval = setInterval(fetchStatus, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [conversation._id]); // Dependency array includes `conversation._id`

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
        {/* Profile Picture */}
        <div className="avatar">
          <img
            src={conversation.profileImage || "/default-profile-pic.png"}
            className="rounded-circle mr-1"
            alt={conversation.username || "Profile"}
            width={40}
            height={40}
          />
        </div>

        {/* Username and Status */}
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
              {conversation.username || "Unknown User"}
            </span>
          </div>
          {/* Display Online/Offline Status as a Badge */}
          <div
            className={`badge ${
              status === "online" ? "bg-success" : "bg-secondary"
            }`}
            style={{
              fontSize: "14px",
              padding: "6px 10px",
              borderRadius: "12px",
              marginTop: "4px",
            }}
          >
            {status === "online" ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Divider between conversations */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </a>
  );
};

export default Conversation;