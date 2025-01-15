import { useEffect, useRef } from "react";
import usePsyGetMessages from "../../../hooks/usePsyGetMessages";
import MessageSkeleton from "../../../skeletons/MessageSkeleton";
import PsyMessage from "./PsyMessage";
import usePsyListenMessages from "../../../hooks/usePsyListenMessages"; // Import the psychic listener

const PsyMessages = () => {
  const { messages, loading } = usePsyGetMessages();
  usePsyListenMessages();

  const lastMessageRef = useRef();

  // Ensure unique messages
  const uniqueMessages = Array.from(new Set(messages.map(m => m._id)))
    .map(id => messages.find(m => m._id === id));

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [uniqueMessages]);

  return (
    <div className="card-body">
      <div className="direct-chat-messages" style={{ height: "350px" }}>
        <div className="direct-chat-msg">
          <div className="direct-chat-infos clearfix">
            {!loading &&
              uniqueMessages.length > 0 &&
              uniqueMessages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                  <PsyMessage message={message} />
                </div>
              ))}

            {loading &&
              [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && uniqueMessages.length === 0 && (
              <p className="text-center text-white">
                Send a message to start the conversation
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default PsyMessages;
