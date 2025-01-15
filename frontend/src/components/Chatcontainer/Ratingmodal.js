import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RatingModal = ({ userId, psychicId, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [giftAmount, setGiftAmount] = useState(0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/rating/add", {
        userId,
        psychicId,
        rating,
        comment,
        giftAmount,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Rate the Psychic</h3>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
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
          <input
            type="number"
            min="100"
            max="1000"
            value={giftAmount}
            onChange={(e) => setGiftAmount(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RatingModal;