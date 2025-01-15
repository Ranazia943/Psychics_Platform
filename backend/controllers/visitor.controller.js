import Visitor from '../models/visitor.model.js';

export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitedAt: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching visitor logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
