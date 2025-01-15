import User from "../../models/user.model.js";
import Paidtimer from "../../models/Psychics/Paidtimer.model.js"; // Adjust the import path as necessary
import Psychics from "../../models/psychics.model.js";

export const deductWalletBalance = async (req, res) => {
  try {
    const { userId, psychicId } = req.params;
    const { deductionAmount } = req.body; // deductionAmount = ratePerMinute / 60

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user has enough balance
    if (user.walletBalance < deductionAmount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Deduct from wallet balance
    user.walletBalance -= deductionAmount;
    await user.save(); // Save updated balance in the database

    // Fetch psychic
    const psychic = await Psychics.findById(psychicId);
    if (!psychic) {
      return res.status(404).json({ error: "Psychic not found" });
    }

    // Add to psychic's wallet balance
    psychic.walletBalance += deductionAmount;
    await psychic.save(); // Save updated psychic balance

    // Optionally update the Paidtimer document
    const paidTimer = await Paidtimer.findOne({ userId, psychicId });
    if (paidTimer) {
      paidTimer.psychicsWalletBalance += deductionAmount; // Update the psychic's wallet balance in the paid timer
      await paidTimer.save();
    }

    return res.status(200).json({
      message: "Wallet balance deducted successfully",
      walletBalance: user.walletBalance,
      psychicsWalletBalance: psychic.walletBalance, // Return updated psychic balance
    });
  } catch (error) {
    console.error("Error deducting wallet balance:", error);
    return res.status(500).json({ error: "Failed to deduct wallet balance" });
  }
};
