import { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import usePsySendMessage from "../../../hooks/usePsySendMessage";
import usePsyConversation from "../../../zustand/usePsyConversation";
import { FaLink, FaPaperclip, FaSmile } from "react-icons/fa";
import { useSocketContext } from "../../../context/SocketContext";

const PsyMessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = usePsySendMessage();
  const { setTypingStatus } = usePsyConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (message) {
      setTypingStatus(true);
      socket?.emit("typing", { isTyping: true });
    } else {
      setTypingStatus(false);
      socket?.emit("typing", { isTyping: false });
    }
  }, [message, setTypingStatus, socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    setTypingStatus(false); // Stop typing status once the message is sent
    socket?.emit("typing", { isTyping: false }); // Notify that typing has stopped
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

export default PsyMessageInput;
