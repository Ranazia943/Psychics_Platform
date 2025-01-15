// Import necessary modules
import PayPalPayment from "../../models/Psychics/Paypal.js"; // PayPal Payment model
import User from "../../models/user.model.js"; // User model


export const createPayment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { userId, amount, currency, transactionId, paymentDetails } = req.body;

    if (!userId || !amount || !currency || !transactionId) {
      return res.status(400).json({ message: "Missing required payment fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User before update:", user);

    // Create a payment record
    const payment = new PayPalPayment({
      userId,
      amount,
      currency,
      transactionId,
      paymentStatus: "COMPLETED",
      paymentDetails,
    });

    await payment.save(); // Make sure this is saving properly

    // Update the user's balance
    user.walletBalance = (user.walletBalance || 0) + parseFloat(amount);

    await user.save(); // Save updated user data

    console.log("Payment created and user balance updated");

    // Respond with success message and payment data
    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getPaymentNotifications = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from route parameters

    // Find payments made by the user
    const payments = await PayPalPayment.find({ userId }).sort({ createdAt: -1 }); // Sort by date descending

    if (!payments.length) {
      return res.status(404).json({ message: "No payment notifications found" });
    }

    // Map the payments to a more readable format
    const notifications = payments.map(payment => ({
      amount: payment.amount,
      currency: payment.currency,
      transactionId: payment.transactionId,
      createdAt: payment.createdAt,
    }));

    // Respond with the list of notifications
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching payment notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch user balance
// Fetch user balance
export const getUserBalance = async (req, res) => {
  try {
    const { userid } = req.params; // Ensure this matches your route parameter

    // Find the user by their ID
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's wallet balance
    res.status(200).json({ balance: user.walletBalance });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllTransactions = async (req, res) => {
  try {
    // Fetch all PayPal payments and populate the user details
    const payments = await PayPalPayment.find()
      .populate({
        path: "userId",
        select: "username email", // Select only the required fields from the User model
      })
      .sort({ createdAt: -1 }); // Sort by date descending

    if (!payments.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    // Map the payments to include user details
    const transactions = payments.map((payment) => ({
      transactionId: payment.transactionId,
      amount: payment.amount,
      currency: payment.currency,
      paymentStatus: payment.paymentStatus,
      createdAt: payment.createdAt,
      user: {
        username: payment.userId?.username,
        email: payment.userId?.email,
      },
    }));

    // Respond with the list of transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};