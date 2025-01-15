import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

const ProtectRoute = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (req.cookies.psychic_jwt) {
            token = req.cookies.psychic_jwt;
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, "7fHJ@5d9!2Fb*8zLPWmQc&nG@Yx6E#Jk");

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        let user;
        if (decoded.userId && token === req.cookies.jwt) {
            user = await User.findById(decoded.userId).select("-password");
        } else if (token === req.cookies.psychic_jwt) {
            const conversations = await Conversation.find({
                participants: { $all: [decoded.psychicId] }
            }).select('participants');
        
            const senderIds = conversations.map(conversation => {
                const psychicIndex = conversation.participants.findIndex(participant => participant === decoded.psychicId);
                const senderIndex = 1 - psychicIndex;
                return conversation.participants[senderIndex];
            });
        
            user = await User.find({ _id: { $in: senderIds } }).select("-password");
        }
        

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default ProtectRoute;
