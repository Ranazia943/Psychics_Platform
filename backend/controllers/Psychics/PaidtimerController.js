import PaidTimer from '../../models/Psychics/Paidtimer.model.js';
import User from '../../models/user.model.js';
import Profile from '../../models/Psychics/Profile.model.js';  // For getting the psychic's chargesPerMin
import Psychics from '../../models/psychics.model.js'; // For getting the psychic's ID
import mongoose from 'mongoose';

// User sends a request for a paid session
export const requestPaidTimer = async (req, res) => {
  const { userId, psychicId } = req.body;

  try {
    // Fetch the psychic using the Psychics model for psychicId
    const psychic = await Psychics.findById(psychicId);
    if (!psychic) {
      return res.status(404).json({ message: 'Psychic not found' });
    }

    // Fetch the chargesPerMin from the Profile model using psychicId
    const profile = await Profile.findOne({ Psychics: psychicId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found for psychic' });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new paid timer based on psychic's chargesPerMin and user's wallet balance
    const newTimer = new PaidTimer({
      userId,
      psychicId,
      chargesPerMin: profile.chargesPerMin, // Charge per minute from Profile model
      userBalance: user.walletBalance, // Store the user's wallet balance in the timer
    });

    // Save the new paid timer to the database
    await newTimer.save();
    res.status(200).json(newTimer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Psychic fetches pending requests
export const fetchPendingRequests = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Fetch pending requests for the psychic
    const requests = await PaidTimer.find({ psychicId, status: 'pending' }).populate('userId');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Psychic accepts or rejects a request
export const acceptRejectRequest = async (req, res) => {
  const { timerId, action } = req.body;

  try {
    const timer = await PaidTimer.findById(timerId);
    if (!timer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    // Update the status of the request (either accepted or rejected)
    timer.status = action === 'accept' ? 'accepted' : 'rejected';
    await timer.save();

    // Notify user via toast notification (in the front-end, update status after this API call)
    res.status(200).json(timer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// User fetches the status of their request
export const fetchRequestStatus = async (req, res) => {
  const { timerId } = req.params;

  try {
    const timer = await PaidTimer.findById(timerId);

    if (!timer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    // If status is "pending", do not fetch the data
    if (timer.status === "pending") {
      return res.status(200).json({ status: "pending", message: "Your request is still pending." });
    }

    // Respond with the timer details if the status is not "pending"
    res.status(200).json(timer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const startPaidTimer = async (req, res) => {
  const { timerId } = req.body;

  try {
    const timer = await PaidTimer.findById(timerId).populate('userId psychicId');
    if (!timer || timer.status !== 'accepted') {
      return res.status(400).json({ message: 'Timer not accepted or not found' });
    }

    const user = await User.findById(timer.userId._id);
    const psychicProfile = await Profile.findOne({ Psychics: timer.psychicId._id });

    if (isNaN(user.walletBalance) || user.walletBalance <= 0) {
      user.walletBalance = 0; // Set to 0 if invalid
      await user.save(); // Save the corrected wallet balance
      return res.status(400).json({ message: 'Invalid wallet balance' });
    }

    const totalMinutes = Math.floor(user.walletBalance / psychicProfile.chargesPerMin);
    if (totalMinutes <= 0) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    timer.startTime = Date.now();
    timer.status = 'running';
    timer.duration = totalMinutes;
    await timer.save();

    const interval = setInterval(async () => {
      const elapsedMinutes = Math.floor((Date.now() - timer.startTime) / 60000);
      const remainingMinutes = Math.max(0, timer.duration - elapsedMinutes);

      if (remainingMinutes > 0) {
        const deduction = elapsedMinutes * psychicProfile.chargesPerMin;

        if (deduction <= user.walletBalance) {
          user.walletBalance -= psychicProfile.chargesPerMin;
          await user.save();
        }
      }

      if (remainingMinutes <= 0 || user.walletBalance <= 0) {
        clearInterval(interval);
        timer.status = 'completed';
        timer.endTime = Date.now();
        await timer.save();
      }
    }, 60000); // Deduct balance every minute

    res.status(200).json({ timer, totalMinutes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchRunningTimer = async (req, res) => {
  const { timerId } = req.params;

  try {
    const timer = await PaidTimer.findById(timerId).populate('userId psychicId');
    if (!timer || timer.status !== 'running') {
      return res.status(404).json({ message: 'No running timer found' });
    }

    const user = await User.findById(timer.userId._id);
    const psychicProfile = await Profile.findOne({ Psychics: timer.psychicId._id });

    if (isNaN(user.walletBalance) || user.walletBalance <= 0) {
      user.walletBalance = 0;
      await user.save();
      return res.status(400).json({ message: 'Invalid wallet balance' });
    }

    const elapsedSeconds = Math.floor((Date.now() - timer.startTime) / 1000);
    const totalDurationSeconds = timer.duration * 60;
    const remainingSeconds = Math.max(0, totalDurationSeconds - elapsedSeconds);

    if (remainingSeconds === 0) {
      timer.status = 'completed';
      timer.endTime = Date.now();
      await timer.save();
    }

    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsOnly = remainingSeconds % 60;

    res.status(200).json({
      remainingTime: `${remainingMinutes}:${remainingSecondsOnly < 10 ? '0' : ''}${remainingSecondsOnly}`,
      totalTimeSpent: elapsedSeconds,
      status: timer.status,
      userWalletBalance: user.walletBalance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const endPaidTimer = async (req, res) => {
  const { timerId, endedBy, userId, psychicId } = req.body; // Include userId and psychicId for validation

  try {
    const timer = await PaidTimer.findById(timerId).populate('userId psychicId');
    if (!timer || timer.status !== 'running') {
      return res.status(400).json({ message: 'Timer is not running or not found' });
    }

    // Validate if the user or psychic is authorized to end the timer
    if (endedBy === 'user' && timer.userId._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: User does not match the timer' });
    }

    if (endedBy === 'psychic' && timer.psychicId._id.toString() !== psychicId) {
      return res.status(403).json({ message: 'Unauthorized: Psychic does not match the timer' });
    }

    const user = await User.findById(timer.userId._id);
    const psychicProfile = await Profile.findOne({ Psychics: timer.psychicId._id });

    // Calculate the total time spent in minutes
    const elapsedMinutes = Math.floor((Date.now() - timer.startTime) / 60000);
    const totalTimeSpent = Math.min(elapsedMinutes, timer.duration); // Ensure it doesn't exceed the total duration

    // Update the timer's end time, status, and total time spent
    timer.endTime = Date.now();
    timer.status = 'completed';
    timer.duration = totalTimeSpent; // Update the duration to reflect the actual time spent
    timer.endedBy = endedBy; // Store who ended the timer

    // Deduct the final amount from the user's wallet
    const totalDeduction = totalTimeSpent * psychicProfile.chargesPerMin;
    user.walletBalance -= totalDeduction;
    timer.userBalanceDeducted = totalDeduction;

    // Save the updated timer and user
    await timer.save();
    await user.save();

    res.status(200).json({
      message: `Timer ended by ${endedBy}. Total time spent: ${totalTimeSpent} minutes.`,
      timer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchTotalTimeSpent = async (req, res) => {
  const { timerId } = req.params;

  try {
    const timer = await PaidTimer.findById(timerId);
    if (!timer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    let totalTimeSpent = 0;
    if (timer.status === 'completed') {
      totalTimeSpent = timer.duration; // Use the updated duration
    } else if (timer.status === 'running') {
      totalTimeSpent = Math.floor((Date.now() - timer.startTime) / 60000); // Calculate elapsed time
    }

    res.status(200).json({
      totalTimeSpent: `${totalTimeSpent} minutes`,
      endedBy: timer.endedBy || 'Timer is still running',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const fetchTotalTimePsychic = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Convert psychicId to ObjectId
    const objectIdPsychicId = new mongoose.Types.ObjectId(psychicId);

    // Aggregate all completed timers for the psychic and sum up the duration
    const result = await PaidTimer.aggregate([
      {
        $match: {
          psychicId: objectIdPsychicId, // Use ObjectId
          status: 'completed', // Ensure this matches the status in the database
        },
      },
      {
        $group: {
          _id: null, // Group all documents into a single result
          totalTimeSpent: { $sum: '$duration' }, // Sum up the duration
        },
      },
    ]);

    // If no completed sessions are found, return 0
    const totalTimeSpent = result.length > 0 ? result[0].totalTimeSpent : 0;

    res.status(200).json({
      psychicId,
      totalTimeSpent: `${totalTimeSpent} minutes`,
    });
  } catch (err) {
    console.error('Error fetching total time:', err);
    res.status(500).json({ error: err.message });
  }
};

export const fetchTotalEarningsPsychic = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Convert psychicId to ObjectId
    const objectIdPsychicId = new mongoose.Types.ObjectId(psychicId);

    // Step 1: Fetch total time spent by the psychic
    const totalTimeResult = await PaidTimer.aggregate([
      {
        $match: {
          psychicId: objectIdPsychicId,
          status: 'completed', // Only consider completed sessions
        },
      },
      {
        $group: {
          _id: null,
          totalTimeSpent: { $sum: '$duration' }, // Sum up the duration
        },
      },
    ]);

    // If no completed sessions are found, total time spent is 0
    const totalTimeSpent = totalTimeResult.length > 0 ? totalTimeResult[0].totalTimeSpent : 0;

    // Step 2: Fetch the psychic's chargesPerMin from their Profile
    const psychicProfile = await Profile.findOne({ Psychics: objectIdPsychicId });
    if (!psychicProfile) {
      return res.status(404).json({ message: 'Profile not found for psychic' });
    }

    const chargesPerMin = psychicProfile.chargesPerMin;

    // Step 3: Calculate total earnings using half of chargesPerMin
    const halfChargesPerMin = chargesPerMin / 2; // Divide chargesPerMin by 2
    const totalEarnings = totalTimeSpent * halfChargesPerMin;

    // Step 4: Return the result
    res.status(200).json({
      psychicId,
      totalTimeSpent: `${totalTimeSpent} minutes`,
      chargesPerMin,
      halfChargesPerMin, // Include halfChargesPerMin in the response
      totalEarnings: `$${totalEarnings.toFixed(2)}`, // Format earnings to 2 decimal places
    });
  } catch (err) {
    console.error('Error fetching total earnings:', err);
    res.status(500).json({ error: err.message });
  }
};

export const fetchAllTimeEarningsPsychic = async (req, res) => {
  const { psychicId } = req.params;

  try {
    // Convert psychicId to ObjectId
    const objectIdPsychicId = new mongoose.Types.ObjectId(psychicId);

    // Step 1: Fetch all completed timers for the psychic
    const completedTimers = await PaidTimer.aggregate([
      {
        $match: {
          psychicId: objectIdPsychicId,
          status: 'completed', // Only consider completed sessions
        },
      },
      {
        $lookup: {
          from: 'users', // Join with the User collection
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails', // Unwind the userDetails array
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          timerId: '$_id', // Include the timer ID
          userId: '$userId',
          userName: '$userDetails.username', // Include user's name
          userEmail: '$userDetails.email', // Include user's email
          duration: 1, // Include the duration of the timer
          chargesPerMin: 1, // Include charges per minute
          totalCost: { $multiply: ['$duration', '$chargesPerMin'] }, // Calculate total cost for each timer
          userBalance: '$userDetails.walletBalance', // Include user's wallet balance
        },
      },
    ]);

    // Step 2: Calculate total time spent and total earnings
    const totalTimeSpent = completedTimers.reduce((sum, timer) => sum + timer.duration, 0);
    const totalEarnings = completedTimers.reduce((sum, timer) => sum + timer.totalCost, 0);

    // Step 3: Format messages for each completed timer
    const messages = completedTimers.map((timer) => {
      return `Chat timer for ${timer.duration} minutes has been completed with ${timer.userName} with balance $${timer.userBalance.toFixed(2)}`;
    });

    // Step 4: Return the result in an array format
    res.status(200).json({
      psychicId,
      totalTimeSpent: `${totalTimeSpent} minutes`,
      totalEarnings: `$${totalEarnings.toFixed(2)}`, // Format earnings to 2 decimal places
      messages, // Include formatted messages
    });
  } catch (err) {
    console.error('Error fetching all-time earnings:', err);
    res.status(500).json({ error: err.message });
  }
};