import jwt from "jsonwebtoken";
import Psychics from "../models/psychics.model.js";

const PsyprotectRoute = async (req, res, next) => {

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

        let psychics;
        if (req.cookies.jwt) {
            psychics = await Psychics.find().select("-password");
        } else if (req.cookies.psychic_jwt) {
            psychics = await Psychics.findById(decoded.psychicId).select("-password");
        }

        if (!psychics) {
            return res.status(404).json({ error: "Psychics not found" });
        }

        req.psychics = psychics;
        next();
        
    } catch (error) {
        console.log("Error in PsyprotectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default PsyprotectRoute;
