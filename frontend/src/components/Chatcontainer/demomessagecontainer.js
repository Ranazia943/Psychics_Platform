import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import notificationSound from "./notification.mp3";

const MessageContainer = () => {
  const { selectedConversation, typingStatus, busyStatus } = useConversation();
  const { authUser } = useAuthContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [ratePM, setRatePM] = useState(0);
  const [ringtone, setRingtone] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [PaidTimerActive, setPaidTimerActive] = useState(false);
  const [PaidRemainingTime, setPaidRemainingTime] = useState(0);
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    const audio = new Audio(notificationSound);
    setRingtone(audio);

    if (authUser && selectedConversation) {
      // Fetch initial states
      fetchFreeTimerState(authUser._id, selectedConversation._id);
      fetchUserAndPsychicData(authUser._id, selectedConversation._id);
      fetchPaidTimerState(authUser._id, selectedConversation._id);

      // Set up polling for paid timer state
      const interval = setInterval(() => {
        fetchPaidTimerState(authUser._id, selectedConversation._id);
      }, 3000); // Poll every 3 seconds
      setPollingInterval(interval);
    }

   

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [authUser, selectedConversation]);

  const fetchFreeTimerState = async (userId, psychicId) => {
    try {
      const { data } = await axios.get(`/api/timer/state/${userId}/${psychicId}`);
      if (data.freeTimerStatus === "pending") {
        toast.info(`Your request is pending: ${data.statusMessage}`);
      }
      if (data.freeTimerStatus === "accepted") {
        if (!data.freeTimerUsed) {
          const initialTime = calculateRemainingTime(data.freeTimerStartedAt);
          if (!timerActive) {
            startTimerCountdown(initialTime);
          }
        } else {
          setTimerActive(false);
          setRemainingTime(0);
        }
      } else {
        setTimerActive(false);
        setRemainingTime(0);
      }
    } catch (error) {
      console.error("Error fetching free timer state:", error);
    }
  };

  const startTimerCountdown = (initialTime) => {
    const startTime = Date.now();
    const endTime = startTime + initialTime;

    setRemainingTime(initialTime);
    setTimerActive(true);

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimerActive(false);
        setRemainingTime(0);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);

    setTimerInterval(interval);
  };

  const formatdRemainingTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const calculateRemainingTime = (timerStartedAt) => {
    const now = new Date();
    const elapsed = now - new Date(timerStartedAt);
    return Math.max(0, 3 * 60 * 1000 - elapsed);
  };

  const requestFreeTimer = async () => {
    if (!authUser || !selectedConversation) {
      toast.error("You must be logged in and have a conversation selected.");
      return;
    }

    const userId = authUser._id;
    const psychicId = selectedConversation._id;

    try {
      const response = await axios.post(`/api/timer/request/${psychicId}`, { userId });
      if (response.status === 201) {
        toast.success("Free timer request sent successfully!");
        fetchFreeTimerState(userId, psychicId);
      }
    } catch (error) {
      toast.error(error.response?.data.error || "Failed to send free timer request.");
    }
  };

  const sendPaidTimerRequest = async () => {
    if (!authUser || !selectedConversation) {
      toast.error("You must be logged in and have a conversation selected.");
      return;
    }
  
    const psychicId = selectedConversation._id;
    const userId = authUser._id;
  
    try {
      const response = await axios.post(`/api/paidtimer/request/${psychicId}`, { userId });
      toast.success(response.data.message);
      
      // Immediately set status to 'accepted' on the frontend, before polling
      if (response.status === 200 && response.data.status === "accepted") {
        setPaidTimerActive(true);
        fetchPaidTimerState(userId, psychicId); // Refresh state immediately
      }
    } catch (error) {
      toast.error("Failed to send paid timer request. Please try again.");
    }
  };
  

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
      clearInterval(pollingInterval);
    };
  }, [timerInterval, pollingInterval]);
  

 // In MessageContainer.js
 const fetchPaidTimerState = async (userId, psychicId, setPaidTimerActive, setPaidRemainingTime) => {
  try {
    const { data } = await axios.get(`/api/paidtimer/state/${psychicId}/${userId}`);
    
    if (data.timer) {
      const { paidTimerStatus, remainingTime } = data.timer;
      
      if (paidTimerStatus === 'accepted') {
        // Timer is accepted but not yet active; maybe show a waiting message
        toast.info("Timer accepted. Waiting to start.");
      } else if (paidTimerStatus === 'active') {
        // Timer is active, update state accordingly
        setPaidTimerActive(true);
        if (remainingTime) {
          setPaidRemainingTime(remainingTime); // Set remaining time if it's active
        }
      } else {
        // Handle other cases like rejected or pending
        setPaidTimerActive(false);
        toast.error("Timer not active or rejected.");
      }
    } else {
      toast.error("No timer found for this conversation.");
    }
  } catch (error) {
    console.error("Error fetching paid timer state:", error);
  }
};



  const fetchUserAndPsychicData = async (userId, psychicId) => {
    try {
      const { data } = await axios.get(`/api/paidtimer/data/${psychicId}/${userId}`);
      setWalletBalance(data.walletBalance);
      setRatePM(data.ratePerMinute);
      startPaidTimerIfEligible(data.walletBalance, data.ratePerMinute);
    } catch (error) {
      console.error("Error fetching user and psychic data:", error);
      toast.error("Failed to fetch user and psychic data.");
    }
  };


  const deductWalletBalance = async () => {
    try {
        const deduction = ratePM / 60; // Rate per second
        if (walletBalance - deduction >= 0) {
            setWalletBalance(prev => prev - deduction);
            await axios.post(`/api/wallet/deduct/${selectedConversation._id}/${authUser._id}`, {
              deductionAmount: deduction,
            });
        } else {
            // Handle balance depletion
            setWalletBalance(0);
            setPaidTimerActive(false);
            setPaidRemainingTime(0);
            toast.error("Wallet balance depleted. Timer ended.");
            clearInterval(timerInterval); // Stop timer interval
        }
    } catch (error) {
        console.error("Failed to deduct wallet balance:", error);
    }
};


  const startPaidTimerIfEligible = (walletBalance, ratePerMinute) => {
    const allowedMinutes = Math.floor(walletBalance / ratePerMinute);
    const allowedTime = allowedMinutes * 60 * 1000;

    if (allowedMinutes > 0) {
      startPaidTimer(allowedTime);
      deductWalletBalance();
    } else {
      toast.error("Insufficient wallet balance to start a paid session.");
    }
  };


  const startPaidTimer = async (allowedTime) => {
    const psychicId = selectedConversation._id;
    const userId = authUser._id;

    try {
        const response = await axios.post(`/api/paidtimer/start/${psychicId}`, { userId });

        if (response.status === 200) {
            if (response.data.timer.paidTimerStatus === 'accepted') {
                setPaidRemainingTime(allowedTime); // Set remaining time based on allowed minutes
                setPaidTimerActive(true);
                startPaidCountdown(allowedTime); // Start countdown immediately
                toast.success("Paid timer started successfully!");
            } else {
                toast.error("Cannot start the paid timer. Timer status is not accepted.");
            }
        }
    } catch (error) {
        toast.error("Failed to start the paid timer. Please try again.");
        console.error("Error starting paid timer:", error);
    }
};





  const startPaidCountdown = (duration) => {
    const endTime = Date.now() + duration;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const interval = setInterval(async () => {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            setPaidTimerActive(false);
            setPaidRemainingTime(0);
        } else {
            setPaidRemainingTime(timeLeft);
            await deductWalletBalance();  // Deduct the balance each second
        }
    }, 1000);

    setTimerInterval(interval);
};

  const formatPaidRemainingTime = (timeInMilliseconds) => {

   
  const totalSeconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};



  return (
    <div className="col-12 col-xl-12">
      <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="card-header d-flex justify-content-between" style={{ backgroundColor: "#a30cad", padding: "1rem", borderRadius: "0.75rem 0.75rem 0 0", borderBottom: "2px solid #FFD700" }}>
          <h3 className="card-title" style={{ margin: 0, color: "#FFD700" }}></h3>
          {selectedConversation ? (
            <div className="d-flex justify-content-between flex-grow-1">
              <div className="d-flex flex-column text-white">
                <div className="d-flex align-items-center mb-1">
                  <span className="mr-2" style={{ fontSize: "20px", fontWeight: "bold", color: "#FFD700" }}>To:</span>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "#FFF" }}>{selectedConversation.username}</span>
                </div>
                <div className="d-flex flex-column mb-1">
    <div>

    <span style={{ color: "#FFD700", fontWeight: "500" }}>
                      Free: {timerActive ? formatdRemainingTime(remainingTime) : "Not active"}
                    </span>
                    <div>
       <span style={{ color: "#FFD700", fontWeight: "500" }}>
                  Paid Timer: {PaidTimerActive ? formatPaidRemainingTime(PaidRemainingTime) : "Not active"}
                </span>
        </div>
    </div>
    <div>
    <div>
   

</div>

  </div>
</div>

              </div>
              <div className="d-flex flex-column text-white align-items-center">
                <div className="d-flex align-items-center mb-1">
                  <FaEye style={{ color: "#FFF", fontSize: "24px", marginRight: "8px" }} />
                  <span style={{ color: "#FFF", fontWeight: "500" }}>Profile</span>
                </div>
                <div className="text-muted small">
                  <em style={{ color: "#FFF" }}>{typingStatus ? "Typing..." : ""} {busyStatus ? " Busy" : ""}</em>
                </div>
              </div>
              <div className="d-flex flex-column text-white align-items-center">
              <span style={{ color: "#FFD700", fontWeight: "500" }}>
                  Wallet Balance:{" "}
                  <span className="text-white font-300" style={{ fontSize: "20px" }}>
                      ${walletBalance.toFixed(2)}
                    </span>
                  </span>
    <div className="d-flex align-items-center mb-1">
                  <span style={{ color: "#FFD700", fontWeight: "500" }}>Rate Per Minute: ${ratePM.toFixed(2)}</span>
                </div>
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
              <button className="btn btn-warning mt-2" onClick={requestFreeTimer}>Request Free Timer</button>
            </>
          )}
        </div>

        {selectedConversation && (
          <div className="d-flex justify-content-between p-2" style={{ borderTop: "1px solid #ddd", backgroundColor: "#f8f9fa" }}>
            <button className="btn btn-danger" onClick={sendPaidTimerRequest}>Start Paid Timer</button>
            <button className="btn btn-secondary" onClick={() => setPaidTimerActive(false)}>Stop Paid Timer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
