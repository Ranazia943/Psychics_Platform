import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming the path is correct for your project
import { toast } from "react-toastify";

const FreeTimer = ({ psychicId }) => {
  const { authUser } = useAuthContext(); // Get the logged-in user from AuthContext
  const [loading, setLoading] = useState(false); // State to manage button loading

  const handleFreeTimerRequest = async () => {
    if (!authUser) {
      toast.error("You need to be logged in to request a free timer.");
      return;
    }

    // Print both user ID and psychic ID to the console
    console.log("User ID:", authUser._id);
    console.log("Psychic ID:", psychicId);

    setLoading(true); // Set loading to true when the request starts

    try {
      // Fix the URL to include the psychicId dynamically
      const response = await axios.post(`/api/freetimer/request/${psychicId}`, {
        userId: authUser._id, // Get logged-in user's ID from auth context
      });

      // Check the response to determine if the request was successful
      if (response.data.success) {
        // Success toast
      } else {
        // Handle the case where the response does not indicate success
        toast.success("Free timer request sent successfully.");  // Error toast
      }
    } catch (error) {
      // Log the error and show a toast notification for any unexpected errors
      console.error("Error sending free timer request:", error);
      toast.error("An error occurred while sending the free timer request."); // Error toast for catch block
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  return (
    <button
      className="btn btn-warning"
      onClick={handleFreeTimerRequest}
      disabled={loading} // Disable button while loading
    >
      {loading ? "Sending Request..." : "Request Free Timer"}
    </button>
  );
};

export default FreeTimer;
