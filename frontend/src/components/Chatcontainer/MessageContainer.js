import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import user_ring from "../../assets/sounds/user_ring.mp3";
import "./MessageContainer.css"; // Import the CSS file for modal styling

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const [ringtone, setRingtone] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false); // State to control the RatingModal
  const [ratingModalShown, setRatingModalShown] = useState(false); // Track if the rating modal has been shown
  const [totalTimeSpent, setTotalTimeSpent] = useState(""); // Track total time spent
  const [endedBy, setEndedBy] = useState(""); // Track who ended the timer
  
  // State for rating, comment, and gift amount
  const [rating, setRating] = useState(0); // Default rating is 0 (no stars selected)
  const [comment, setComment] = useState(""); // Default comment is empty
  const [giftAmount, setGiftAmount] = useState(0); // Default gift amount is 0

  // Gift amount options
  const giftAmounts = [100, 200, 300, 500, 800, 1000];

  useEffect(() => {
    const audio = new Audio(user_ring);
    setRingtone(audio);
  }, []);

  // Function to send a request to the psychic
  const handleSendRequest = async () => {
    try {
      const response = await axios.post('/api/paidtimer/request', {
        userId: authUser._id,
        psychicId: selectedConversation._id,
      });
      toast.success("Request sent to psychic.");
      setTimerId(response.data._id);
      setRequestStatus("Your request is pending.");
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send the request.");
    }
  };

  // Function to start the paid timer
  const startPaidTimer = async () => {
    if (!timerId) return;

    try {
      toast.dismiss("request-accepted"); // Dismiss the request toast
      const response = await axios.post('/api/paidtimer/start', { timerId });
      if (response.status === 200) {
        toast.success("Paid timer has started.", { autoClose: 3000 });
        setIsTimerStarted(true);
        setRequestStatus("Your paid timer is now running.");

        if (ringtone) {
          ringtone.pause();
          ringtone.currentTime = 0;
        }
      } else {
        toast.error("Failed to start the paid timer.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error starting paid timer:", error);
      toast.error("Failed to start the paid timer.", { autoClose: 3000 });
    }
  };

  // Function to end the paid timer
  const handleEndTimer = async () => {
    if (!timerId) {
      toast.error("No active timer found.");
      return;
    }

    try {
      const response = await axios.post('/api/paidtimer/end', {
        timerId,
        endedBy: "user", // Indicate that the user ended the timer
        userId: authUser._id, // Pass the user's ID for validation
      });

      if (response.data.message) {
        toast.success(response.data.message); // Show success message
        setIsTimerStarted(false); // Stop the timer
        setRequestStatus("Your paid timer has been stopped.");
        setRemainingTime(""); // Clear remaining time
        setWalletBalance(0); // Reset wallet balance
      }
    } catch (error) {
      console.error("Error ending timer:", error);
      toast.error("Failed to end the timer. Please try again.");
    }
  };

  // Fetch request status periodically
  useEffect(() => {
    const fetchRequestStatus = async () => {
      if (!timerId || toastDisplayed) return;

      try {
        const response = await axios.get(`/api/paidtimer/status/${timerId}`);
        const { status, message } = response.data;

        if (status === 'accepted' && !toastDisplayed) {
          setToastDisplayed(true);
          if (ringtone) ringtone.play();

          toast.success(
            <div>
              <p>Your request has been accepted.</p>
              <button onClick={startPaidTimer} style={{ color: 'white', backgroundColor: 'hsl(22.08deg 99.21% 50.59%)', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Start Timer
              </button>
            </div>,
            { toastId: "request-accepted", autoClose: 30000 }
          );
          setRequestStatus("Your request has been accepted.");
        } else if (status === 'rejected' && !toast.isActive("request-rejected")) {
          toast.error(message || "Your request was rejected by the psychic.", { toastId: "request-rejected", autoClose: 3000 });
          setRequestStatus("Your request has been rejected.");
          setToastDisplayed(true);
        }
      } catch (error) {
        console.error("Error fetching request status:", error);
      }
    };

    if (timerId) {
      const interval = setInterval(() => fetchRequestStatus(), 5000);
      return () => clearInterval(interval);
    }
  }, [timerId, toastDisplayed, ringtone]);

  // Fetch running timer data periodically
  useEffect(() => {
    if (!timerId || !isTimerStarted) return;

    const fetchTimerData = async () => {
      try {
        const response = await axios.get(`/api/paidtimer/running/${timerId}`);
        const { remainingTime, userWalletBalance } = response.data;

        setRemainingTime(remainingTime);
        setWalletBalance(userWalletBalance);
      } catch (error) {
        console.error("Error fetching running timer:", error);
      }
    };

    const interval = setInterval(() => fetchTimerData(), 1000);
    return () => clearInterval(interval);
  }, [timerId, isTimerStarted]);

  // Monitor PaidTimer status for completion
  useEffect(() => {
    const checkForCompletedTimer = async () => {
      if (!timerId || ratingModalShown) return; // Don't check if modal has already been shown

      try {
        const response = await axios.get(`/api/paidtimer/status/${timerId}`);
        const { status } = response.data;

        if (status === 'completed') {
          setShowRatingModal(true); // Show the RatingModal
        }
      } catch (error) {
        console.error("Error checking timer status:", error);
      }
    };

    const interval = setInterval(() => checkForCompletedTimer(), 5000);
    return () => clearInterval(interval);
  }, [timerId, ratingModalShown]);
  const fetchTotalTimeSpent = async () => {
    if (!timerId) return;

    try {
      const response = await axios.get(`/api/paidtimer/total-time-spent/${timerId}`);
      const { totalTimeSpent, endedBy } = response.data;

      setTotalTimeSpent(totalTimeSpent); // Update total time spent
      setEndedBy(endedBy); // Update who ended the timer

      // Show toast notification indicating who ended the chat
      toast.info(`Chat ended by ${endedBy}. Total time spent: ${totalTimeSpent}`);
    } catch (error) {
      console.error("Error fetching total time spent:", error);
    }
  };
  // Function to handle rating, comment, and gift submission
  const handleRatingSubmit = async () => {
    try {
      console.log("Submitting rating with payload:", {
        userId: authUser._id,
        psychicId: selectedConversation._id,
        rating,
        comment,
        giftAmount,
      }); // Debugging

      const response = await axios.post(`/api/rating/add/${selectedConversation._id}`, {
        userId: authUser._id,
        psychicId: selectedConversation._id,
        rating,
        comment,
        giftAmount,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        setShowRatingModal(false); // Close the modal
        setRatingModalShown(true); // Mark the modal as shown
      }
    } catch (error) {
      console.error("Error submitting rating:", error); // Debugging
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  // Function to handle canceling the rating modal
  const handleCancelRating = () => {
    setShowRatingModal(false); // Close the modal
    setRatingModalShown(true); // Mark the modal as shown
  };

  // Function to handle star selection
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // Function to handle gift amount selection
  const handleGiftAmountClick = (amount) => {
    setGiftAmount(amount);
  };

  return (
    <div className="col-12 col-xl-12">
      <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="card-header d-flex justify-content-between" style={{ backgroundColor: "#a30cad", padding: "1rem", borderRadius: "0.75rem 0.75rem 0 0", borderBottom: "2px solid #FFD700" }}>
          {selectedConversation ? (
            <div className="d-flex justify-content-between flex-grow-1">
              <div className="d-flex flex-column text-white">
                <div className="d-flex align-items-center mb-1">
                  <span className="mr-2" style={{ fontSize: "20px", fontWeight: "bold", color: "#FFD700" }}>To:</span>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "#FFF" }}>{selectedConversation.username}</span>
                </div>
              </div>
              <div className="d-flex flex-column text-white align-items-center">
                {isTimerStarted && (
                  <div>
                    <span>Remaining Time: {remainingTime}</span>
                    <br />
                    <span>Wallet Balance: ${walletBalance}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h3 className="card-title" style={{ color: "#FFD700" }}>Select a conversation to start</h3>
          )}
        </div>

        <div className="card-body" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {selectedConversation && (
            <>
              <Messages />
              <MessageInput />
            </>
          )}
        </div>

        <div className="card-footer text-center">
          {isTimerStarted ? (
            <button className="btn btn-danger" onClick={handleEndTimer}>
              End Timer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSendRequest}>
              Send Request to Psychic
            </button>
          )}
        </div>
      </div>
      <ToastContainer />

      {/* Render the RatingModal if showRatingModal is true */}
      {showRatingModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Rate the Psychic</h3>
            <div>
              <label>Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={star <= rating ? "active" : ""}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <label>Gift Amount (optional):</label>
              <div className="gift-amounts">
                {giftAmounts.map((amount) => (
                  <button
                    key={amount}
                    className={giftAmount === amount ? "active" : ""}
                    onClick={() => handleGiftAmountClick(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-buttons">
              <button type="submit" onClick={handleRatingSubmit}>Submit</button>
              <button type="button" onClick={handleCancelRating}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;