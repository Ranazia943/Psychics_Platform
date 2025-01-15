import express from "express";
import { createPayment, getUserBalance,getPaymentNotifications,getAllTransactions } from "../../controllers/Psychics/PaypalController.js";

const router = express.Router();

// Endpoint to handle payment success
router.post("/paypal-payment", createPayment);
router.get("/user/balance/:userid", getUserBalance);
router.get("/payment-notifications/:userId", getPaymentNotifications);
router.get("/transactions", getAllTransactions);

export default router;
