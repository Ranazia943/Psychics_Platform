import React, { useState, useEffect } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Checkout = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState(""); // Default is empty
  const [balance, setBalance] = useState(0);
  const { authUser } = useAuthContext();
  const userId = authUser ? authUser._id : null;

  // Fetch balance when the user logs in
  useEffect(() => {
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    const fetchBalance = async () => {
      try {
        const response = await axios.get(`/api/user/balance/${userId}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userId]);

  // Create order for PayPal
  const onCreateOrder = (data, actions) => {
    if (!price) {
      alert("Please select an amount before proceeding.");
      return Promise.reject(); // Stop order creation
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: parseFloat(price).toFixed(2),
          },
        },
      ],
    });
  };

  // Approve order and handle the backend update
  const onApproveOrder = async (data, actions) => {
    return actions.order
      .capture()
      .then(async (details) => {
        try {
          const response = await axios.post("/api/paypal/paypal-payment", {
            userId,
            amount: parseFloat(price).toFixed(2),
            currency,
            transactionId: details.id,
            paymentDetails: details,
          });

          if (response.status === 201) {
            alert("Payment successful and balance updated!");
            setBalance((prevBalance) => prevBalance + parseFloat(price));
          } else {
            alert("Payment successful but failed to update balance.");
          }
        } catch (error) {
          console.error("Error updating payment to backend:", error);
          alert("Payment successful but failed to update balance.");
        }
      })
      .catch((error) => {
        console.error("Error capturing PayPal payment:", error);
        alert("Error capturing PayPal payment. Please try again.");
      });
  };

  // Handle amount selection from boxes
  const handleAmountSelection = (selectedPrice) => {
    setPrice(selectedPrice);
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>Loading PayPal buttons...</p>
      ) : (
        <>
          {userId ? (
            <>
              <h2>Your Balance: ${balance.toFixed(2)}</h2>
              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {[10, 20, 50, 100, 200].map((amount) => (
                  <div
                    key={amount}
                    style={{
                      padding: "20px",
                      border: price === amount.toString() ? "2px solid green" : "1px solid gray",
                      borderRadius: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      backgroundColor: price === amount.toString() ? "#f0f8ff" : "#ffffff",
                    }}
                    onClick={() => handleAmountSelection(amount.toString())}
                  >
                    {amount} USD
                  </div>
                ))}
              </div>
              {/* Render PayPal buttons only if price is selected */}
              {price && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={onCreateOrder}
                  onApprove={onApproveOrder}
                />
              )}
            </>
          ) : (
            <p>Please log in to make a payment.</p>
          )}
        </>
      )}
    </div>
  );
};

// PayPal Provider Setup
const initialOptions = {
  "client-id":
    "AUF5g32Q05oaYRWyJykmi9uS5CRMcqyYTgeikpeVdQU_7-yKjl66aIPe0uhWT12fj-_owkhQeQUl974q",
  currency: "USD",
};

const App = () => (
  <PayPalScriptProvider options={initialOptions}>
    <Checkout />
  </PayPalScriptProvider>
);

export default App;
