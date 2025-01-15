import jwt from "jsonwebtoken";

const generatePsychicTokenAndSetCookie = (psychicId, res) => {
    const token = jwt.sign({ psychicId }, "7fHJ@5d9!2Fb*8zLPWmQc&nG@Yx6E#Jk", {
        expiresIn: "15d",
    });

    res.cookie("psychic_jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // Prevent XSS attacks (Cross-site scripting attacks)
        sameSite: "strict", // Prevent CSRF attacks (Cross-site request forgery attacks)
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generatePsychicTokenAndSetCookie;
