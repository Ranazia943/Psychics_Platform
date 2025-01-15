import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "right" : "left"; // Changed to match styling in PsyMessage
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  // Apply blue background for user's messages and green for received messages
  const bubbleBgColor = fromMe ? "bg-blue-400" : "bg-green-400";
  const textColor = "text-black"; // Text color remains the same for both

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`direct-chat-msg ${chatClassName}`}>
      <div className="direct-chat-infos clearfix">
        <span
          className={`direct-chat-name ${
            fromMe ? "float-right text-black" : "float-left text-black"
          }`}
        >
          {fromMe ? authUser.username : selectedConversation?.username}
        </span>
        <span
          className={`direct-chat-timestamp ${
            fromMe ? "float-left text-red-500" : "float-right text-red-500"
          }`}
        >
          {formattedTime}
        </span>
      </div>
      <img
        className="direct-chat-img"
        src={profilePic}
        alt="message user image"
      />
      <div
        className={`direct-chat-text ${bubbleBgColor} ${textColor} ${shakeClass} p-2 rounded-lg`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;
