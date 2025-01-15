import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { PsyuseAuthContext } from "../../../../context/PsyAuthContext"; // Adjust the path as needed

const FreeTimerRequest = () => {
  const { authPsychics } = PsyuseAuthContext();

  // Log the authPsychics context
  console.log("Auth Psychics Context:", authPsychics);

  // Fetch free timer requests for the logged-in psychic
  const fetchFreeTimerRequests = async () => {
    if (!authPsychics || !authPsychics._id) {
      console.error("No valid psychic data available."); // Handle error scenario
      return;
    }

    try {
      console.log("Fetching free timer requests for psychic ID:", authPsychics._id); // Log psychic ID
      const { data } = await axios.get(`/api/freetimer/requests/${authPsychics._id}`);

      console.log("Response:", data); // Log the complete response

      // Check if there are any requests and show toast notifications
      if (data.length > 0) {
        data.forEach((request) => {
          console.log("Request ID:", request._id, "User ID:", request.userId); // Log request and user ID
          showToast(request);
        });
      } else {
        console.log("No requests found for this psychic."); // Log when no requests are found
      }
    } catch (error) {
      console.error("Error fetching free timer requests:", error);
    }
  };

  // Display toast notifications for new free timer requests
  const showToast = (request) => {
    const userName = request.userId.username || "Unknown User"; // Access username from userId
  
    const toastId = toast.info(
      <div>
        <span>{`${userName} has requested a free timer.`}</span>
        <button onClick={() => handleAccept(request)}>Accept</button>
        <button onClick={() => handleReject(request)}>Reject</button>
      </div>,
      {
        autoClose: false, // Keep toast open until user action
        closeOnClick: false,
        pauseOnHover: true,
      }
    );
  
    // Optionally, clear the toast after a certain time
    // setTimeout(() => {
    //   toast.dismiss(toastId);
    // }, 30000); // Uncomment this if you want auto-dismissal
  };

  // Accept the free timer request
  const handleAccept = async (request) => {
    try {
      console.log("Accepting request ID:", request._id); // Log the request being accepted
      await axios.patch(`/api/freetimer/accept/${request._id}`);
      toast.success("Free timer request accepted!");
    } catch (error) {
      console.error("Error accepting free timer request:", error);
      toast.error("Failed to accept the request.");
    }
  };

  // Reject the free timer request
  const handleReject = async (request) => {
    try {
      console.log("Rejecting request ID:", request._id); // Log the request being rejected
      await axios.patch(`/api/freetimer/reject/${request._id}`);
      toast.error("Free timer request rejected.");
    } catch (error) {
      console.error("Error rejecting free timer request:", error);
      toast.error("Failed to reject the request.");
    }
  };

  // Effect to fetch requests when the component mounts
  useEffect(() => {
    console.log("Auth Psychics in useEffect:", authPsychics); // Check the value when useEffect runs
    if (authPsychics) {
      fetchFreeTimerRequests();
    }
  }, [authPsychics]);

  return <ToastContainer />;
};

export default FreeTimerRequest;
