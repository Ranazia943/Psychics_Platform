import mongoose from "mongoose";

const paypalPaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who made the payment
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["COMPLETED", "PENDING", "FAILED"],
      default: "PENDING",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: Object, // Store the full PayPal payment response if needed
    },
  },
  { timestamps: true }
);

const PayPalPayment = mongoose.model("PayPalPayment", paypalPaymentSchema);

export default PayPalPayment;
