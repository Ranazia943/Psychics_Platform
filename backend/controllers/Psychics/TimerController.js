import Timer from "../../models/Psychics/Timer.model.js";
export const sendFreeTimerRequest = async (req, res) => {
  const { userId } = req.body;
  const psychicId = req.params.psychicId;

  try {
    if (!userId || !psychicId) {
      return res.status(400).json({ error: "User ID and Psychic ID are required" });
    }

    const existingAcceptedTimer = await Timer.findOne({ userId, psychicId, freeTimerStatus: "accepted" });

    if (existingAcceptedTimer) {
      return res.status(400).json({ error: "You have already started a free chat with this psychic." });
    }

    const newTimerRequest = new Timer({ userId, psychicId, freeTimerStatus: "pending" });
    await newTimerRequest.save();

    // Emit the new timer request to all connected clients
    io.emit("timerRequest", newTimerRequest);

    res.status(201).json({ message: "Free timer request sent successfully", newTimerRequest });
  } catch (error) {
    console.error("Error sending free timer request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptFreeTimerRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const timerRequest = await Timer.findById(requestId);
    if (!timerRequest) {
      return res.status(404).json({ error: "Free timer request not found" });
    }

    const existingAcceptedTimer = await Timer.findOne({ userId: timerRequest.userId, psychicId: timerRequest.psychicId, freeTimerStatus: "accepted" });

    if (existingAcceptedTimer) {
      return res.status(400).json({ error: "An accepted free timer already exists between the user and psychic." });
    }

    // Update the timer status to accepted and start the timer
    timerRequest.freeTimerStatus = "accepted";
    timerRequest.freeTimerStartedAt = new Date();
    await timerRequest.save();

    res.status(200).json({ message: "Free timer request accepted", timerRequest });
  } catch (error) {
    console.error("Error accepting free timer request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const rejectFreeTimerRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const timerRequest = await Timer.findById(requestId);
    if (!timerRequest) {
      return res.status(404).json({ error: "Free timer request not found" });
    }

    // Update the status to rejected
    timerRequest.freeTimerStatus = "rejected";
    timerRequest.freeTimerUsed = true;
    await timerRequest.save();

    res.status(200).json({ message: "Free timer request rejected", timerRequest });
  } catch (error) {
    console.error("Error rejecting free timer request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchFreeTimerInRunningState = async (req, res) => {
  const { userId, psychicId } = req.params;

  try {
    const timer = await Timer.findOne({ userId, psychicId, freeTimerStatus: "accepted" });

    if (!timer) {
      return res.status(404).json({ message: "No running free timer found for this user and psychic" });
    }

    // Define the duration for the free timer (e.g., 3 minutes = 180000 ms)
    const freeChatDuration = 180000; // 3 minutes in milliseconds
    const currentTime = new Date().getTime();
    const timerStartTime = new Date(timer.freeTimerStartedAt).getTime();
    const timeElapsed = currentTime - timerStartTime;

    // Check if the timer has expired
    if (timeElapsed >= freeChatDuration) {
      // Timer expired: update status in DB
      timer.freeTimerUsed = true;
      timer.freeTimerStatus = "expired";
      await timer.save();

      return res.status(200).json({
        message: "Free timer expired",
        freeTimerStatus: "expired",
        timeElapsed,
        freeTimerUsed: true, // Timer has been used
        remainingTime: 0, // No time left since it's expired
      });
    }

    // If timer is still running, calculate the remaining time
    const remainingTime = freeChatDuration - timeElapsed;

    res.status(200).json({
      freeTimerStatus: timer.freeTimerStatus,
      freeTimerStartedAt: timer.freeTimerStartedAt,
      freeTimerUsed: timer.freeTimerUsed,
      timeElapsed, // Time elapsed since the timer started
      remainingTime, // Time left before the timer expires
    });
  } catch (error) {
    console.error("Error fetching free timer in running state:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const fetchFreeTimerRequestsForPsychic = async (req, res) => {
  const { psychicId } = req.params;

  try {
    const timerRequests = await Timer.find({ psychicId, freeTimerStatus: "pending" }).populate('userId', 'username');

    if (!timerRequests || timerRequests.length === 0) {
      return res.status(404).json({ message: "No pending free timer requests found for this psychic" });
    }

    res.status(200).json(timerRequests);
  } catch (error) {
    console.error("Error fetching free timer requests for psychic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
