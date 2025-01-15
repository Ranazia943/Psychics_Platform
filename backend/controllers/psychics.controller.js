import Psychics from "../models/psychics.model.js";

export const getPsychicsForSidebar = async (req, res) => {
    try {
        const loggedInPsychicsId = req.psychics._id;

        const filteredPsychics = await Psychics.find({ _id: { $ne: loggedInPsychicsId } }).select("-password");

        res.status(200).json(filteredPsychics);
    } catch (error) {
        console.error("Error in getPsychicsForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
