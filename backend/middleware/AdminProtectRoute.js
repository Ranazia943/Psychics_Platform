import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const AdminProtectRoute = async (req, res, next) => {
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

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is an admin
        console.log(`User role: ${user.role}`); // Debugging log
        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied - Admins only" });
        }

        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in AdminProtectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export default AdminProtectRoute;
