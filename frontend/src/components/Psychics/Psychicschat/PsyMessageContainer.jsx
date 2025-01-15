import { useEffect, useState, useRef } from "react";
import axios from "axios";
import usePsyConversation from "../../../zustand/usePsyConversation";
import PsyMessageInput from "./PsyMessageInput";
import PsyMessages from "./PsyMessages";
import { TiMessages } from "react-icons/ti";
import { PsyuseAuthContext } from "../../../context/PsyAuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import psychic_ring from "../../../assets/sounds/psychic_ring.mp3";

const PsyMessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = usePsyConversation();
  const { authPsychics } = PsyuseAuthContext();
  const [loading, setLoading] = useState(false);
  const [shownRequests, setShownRequests] = useState(new Set());
  const [timerId, setTimerId] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("offline");
  const [totalTimeSpent, setTotalTimeSpent] = useState(""); // Track total time spent
  const [endedBy, setEndedBy] = useState(""); // Track who ended the timer
  const [isTimerCompleted, setIsTimerCompleted] = useState(false); // Track if the timer is completed

  // Create a reference for the audio object
  const audioRef = useRef(new Audio(psychic_ring));

  // Function to fetch pending requests
  const fetchPendingRequests = async () => {
    if (!authPsychics) return;

    try {
      const response = await axios.get(`/api/paidtimer/requests/${authPsychics._id}`);
      console.log("Pending Requests:", response.data);

      response.data.forEach((request) => {
        if (!shownRequests.has(request._id)) {
          showToast(request);
          // Play the ringtone when a new request is fetched
          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.log("Audio play prevented:", error);
            });
          }
          // Add the request ID to shownRequests to prevent duplicate toasts
          setShownRequests((prev) => new Set(prev.add(request._id)));
        }
      });
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to show toast for new requests
  const showToast = (request) => {
    let progress = 100;
    const toastId = toast.info(
      <div>
        <div>New request from {request.userId.username}.</div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-success"
            onClick={() => handleResponse(request._id, "accept")}
          >
            Accept
          </button>
          <div style={{ width: 30, height: 30, margin: "0 1rem" }}>
            <CircularProgressbar
              value={progress}
              styles={{ path: { stroke: "#28a745" } }}
            />
          </div>
          <button
            className="btn btn-danger"
            onClick={() => handleResponse(request._id, "reject")}
          >
            Reject
          </button>
        </div>
      </div>,
      {
        toastId: `request-${request._id}`,
        autoClose: false,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeButton: true,
      }
    );

    // Update progress bar every second
    const interval = setInterval(() => {
      progress -= (100 / 30); // Decrease progress over 30 seconds
      if (progress <= 0) {
        clearInterval(interval);
        toast.dismiss(toastId);
        setShownRequests((prev) => {
          const updatedRequests = new Set(prev);
          updatedRequests.delete(request._id);
          return updatedRequests;
        });
      } else {
        toast.update(toastId, {
          render: (
            <div>
              <div>New request from {request.userId.username}.</div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleResponse(request._id, "accept")}
                >
                  Accept
                </button>
                <div style={{ width: 30, height: 30, margin: "0 1rem" }}>
                  <CircularProgressbar
                    value={progress}
                    styles={{ path: { stroke: "#28a745" } }}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleResponse(request._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ),
        });
      }
    }, 1000);
  };

  // Function to handle accept/reject response
  const handleResponse = async (timerId, action) => {
    try {
      const response = await axios.post(`/api/paidtimer/accept-reject`, { timerId, action });
      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${action} request successfully.`);

        // Stop the ringtone after action is taken
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Remove the request ID from shownRequests
        setShownRequests((prev) => {
          const updatedRequests = new Set(prev);
          updatedRequests.delete(timerId);
          return updatedRequests;
        });

        if (action === "accept") {
          setTimerId(timerId);
          setIsTimerStarted(true);
        }
      } else {
        toast.dismiss();
        toast.error(`Failed to ${action} request.`);
      }
    } catch (error) {
      console.error("Error responding to request:", error);
      toast.dismiss();
      toast.error("An error occurred while responding.");
    }
  };

  // Function to end the timer
  const handleEndTimer = async () => {
    if (!timerId) {
      toast.error("No active timer found.");
      return;
    }

    try {
      const response = await axios.post('/api/paidtimer/end', {
        timerId,
        endedBy: "psychic", // Indicate that the psychic ended the timer
        psychicId: authPsychics._id, // Pass the psychic's ID for validation
      });

      if (response.data.message) {
        toast.success(response.data.message); // Show success message
        setIsTimerStarted(false); // Stop the timer
        setRemainingTime(""); // Clear remaining time
        setWalletBalance(0); // Reset wallet balance
        setIsTimerCompleted(true); // Mark the timer as completed

        // Fetch total time spent and who ended the timer
        fetchTotalTimeSpent();
      }
    } catch (error) {
      console.error("Error ending timer:", error);
      toast.error("Failed to end the timer. Please try again.");
    }
  };

  // Function to fetch total time spent and who ended the timer
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

  // Function to check if the timer is completed
  const checkTimerCompletion = async () => {
    if (!timerId) return;

    try {
      const response = await axios.get(`/api/paidtimer/status/${timerId}`);
      const { status } = response.data;

      if (status === "completed") {
        setIsTimerStarted(false); // Stop the timer
        setRemainingTime(""); // Clear remaining time
        setWalletBalance(0); // Reset wallet balance
        setIsTimerCompleted(true); // Mark the timer as completed

        // Fetch total time spent and who ended the timer
        fetchTotalTimeSpent();
      }
    } catch (error) {
      console.error("Error checking timer completion:", error);
    }
  };

  useEffect(() => {
    if (authPsychics) {
      setLoading(true);
      fetchPendingRequests();
      const id = setInterval(fetchPendingRequests, 5000);
      return () => clearInterval(id);
    }
  }, [authPsychics]);

  useEffect(() => {
    if (!timerId || !isTimerStarted) return;

    const fetchTimerData = async () => {
      try {
        const response = await axios.get(`/api/paidtimer/running/${timerId}`);
        const { remainingTime, userWalletBalance } = response.data;

        setRemainingTime(remainingTime);
        setWalletBalance(userWalletBalance);

        // Check if the timer is completed
        await checkTimerCompletion();
      } catch (error) {
        console.error("Error fetching running timer:", error);
      }
    };

    const interval = setInterval(() => fetchTimerData(), 1000);
    return () => clearInterval(interval);
  }, [timerId, isTimerStarted]);

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.put(`/api/psychics/${authPsychics._id}/status`, {
        status: newStatus,
      });
      if (response.status === 200) {
        console.log("Updated status:", newStatus);
        setNewStatus(newStatus);
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="col-12 col-xl-9">
      <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="dropdown" ref={dropdownRef} style={{ marginTop: "10px" }}>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    {newStatus}
                  </button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu" style={{ display: "block" }}>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            updateStatus("online");
                            setIsDropdownOpen(false);
                          }}
                        >
                          Online
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            updateStatus("offline");
                            setIsDropdownOpen(false);
                          }}
                        >
                          Offline
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                <br></br>
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
                {!isTimerCompleted && isTimerStarted && (
                  <div>
                    <span>Remaining Time: {remainingTime}</span>
                    <br />
                    <span>Wallet Balance: ${walletBalance}</span>
                  </div>
                )}
                {isTimerCompleted && (
                  <div>
                    <span>Total Time Spent: {totalTimeSpent}</span>
                    <br />
                    <span>Ended By: {endedBy}</span>
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
              <PsyMessages />
              <PsyMessageInput />
            </>
          )}
        </div>

        <div className="card-footer text-center">
          {isTimerStarted && !isTimerCompleted ? (
            <button className="btn btn-danger" onClick={handleEndTimer}>
              End Timer
            </button>
          ) : (
            <div>No active timer</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PsyMessageContainer;