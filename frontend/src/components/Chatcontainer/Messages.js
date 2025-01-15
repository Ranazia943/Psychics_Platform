import React, { useEffect, useState, useRef } from 'react';
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();
    
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
      <div className="card-body">
        <div className="direct-chat-messages" style={{height:"350px"}}>
          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                  <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                  </div>
                ))}

              {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
              {!loading && messages.length === 0 && (
                <p className="text-center text-white">
                  Send a message to start the conversation
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

const MessageWithTimer = ({ message }) => {
    const [trialTimeLeft, setTrialTimeLeft] = useState(() => {
        const storedStartTime = localStorage.getItem(`trialStartTime_${message._id}`);
        if (storedStartTime) {
            const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
            return Math.max(10 - elapsedTime, 0);
        }
        return 180; // 3 minutes in seconds
    });

    const handleTimerClick = () => {
        console.log('Timer button clicked');
        // Add any functionality here, like resetting the timer or showing more information
    };

    useEffect(() => {
        const storedStartTime = localStorage.getItem(`trialStartTime_${message._id}`);
        const startTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = Math.max(180 - elapsedTime, 0);

        const timer = setInterval(() => {
            setTrialTimeLeft(prevTime => Math.max(prevTime - 1, 0));
            localStorage.setItem(`trialStartTime_${message._id}`, startTime.toString());
        }, 1000);

        // Clear the timer when component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <div>

        <div className='timer d-flex justify-content-center mt-3'>
        <button className="btn btn-primary" onClick={handleTimerClick}>
            {trialTimeLeft > 0 ? `Trial Time Left: ${Math.floor(trialTimeLeft / 60)}:${trialTimeLeft % 60 < 10 ? '0' : ''}${trialTimeLeft % 60}` : 'Purchase Chat'}
        </button>
    </div>
        
            <Message message={message} />
       
        </div>
    );
}

export default Messages;
