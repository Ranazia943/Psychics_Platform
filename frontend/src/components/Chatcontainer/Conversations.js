import React, { useState, useRef, useCallback } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prevCount) => prevCount + 6);
  }, []);

  const lastConversationRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleLoadMore();
          }
        },
        { threshold: 1.0 }
      );
      if (node) observerRef.current.observe(node);
    },
    [loading, handleLoadMore]
  );

  const visibleConversations = conversations.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        overflowY: "auto", // Enable vertical scrolling
        height: "500px", // Fixed height to enable scrolling
        padding: "8px 0", // Optional padding
      }}
    >
      {visibleConversations.map((conversation, idx) => (
        <div
          key={conversation._id}
          ref={
            idx === visibleConversations.length - 1 ? lastConversationRef : null
          }
          style={{ marginBottom: "10px" }} // Spacing between conversations
        >
          <Conversation
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === visibleConversations.length - 1}
          />
        </div>
      ))}

      {loading && (
        <span
          className="loading loading-spinner mx-auto mt-2"
          style={{
            display: "block",
            margin: "0 auto", // Center the loading spinner
          }}
        ></span>
      )}
    </div>
  );
};

export default Conversations;
