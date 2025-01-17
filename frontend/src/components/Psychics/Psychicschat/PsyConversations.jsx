import React, { useState, useRef, useCallback } from "react";
import useGetPsyConversations from "../../../hooks/useGetPsyConversations";
import PsyConversation from "./PsyConversation";

const PsyConversations = () => {
  const { loading, conversations } = useGetPsyConversations();
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
        flexDirection: "column",
        overflowY: "auto",
        height: "500px",
        padding: "8px 0",
      }}
    >
      {visibleConversations.map((conversation, idx) => (
        <div
          key={conversation._id}
          ref={
            idx === visibleConversations.length - 1 ? lastConversationRef : null
          }
          style={{ marginBottom: "10px" }}
        >
          <PsyConversation
            conversation={conversation}
            lastIdx={idx === visibleConversations.length - 1}
          />
        </div>
      ))}

      {loading && (
        <span
          className="loading loading-spinner mx-auto"
          style={{
            display: "block",
            margin: "0 auto",
          }}
        ></span>
      )}
    </div>
  );
};

export default PsyConversations;