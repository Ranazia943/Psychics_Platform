import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { FaLink, FaPaperclip, FaSmile } from "react-icons/fa";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form className="px-0 my-3" onSubmit={handleSubmit}>
        <div
          className="flex-grow-0 p-2 px-3 border"
          style={{ backgroundColor: "#a30cad" }} // Apply orange background color
        >
          <div className="input-group">
            <button className="input-icon emoji-icon">
              <FaSmile
                style={{ fontSize: "25px", color: "#fff", padding: "2px" }}
              />
            </button>

            <button className="input-icon file-icon">
              <FaPaperclip style={{ fontSize: "25px", color: "#fff" }} />
            </button>
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />

            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <BsSend size={25} className="text-red-500" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
