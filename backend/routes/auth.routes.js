import express from "express";
import { addFundToUserWallet, deleteUserById, fetchAllUsers, fetchUserProfile,  getTotalUsers, login, logout, signup, updateUserProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.put("/update/:id", updateUserProfile);
router.get("/user/:id", fetchUserProfile);
router.get("/total-users", getTotalUsers); // Add the new route
router.get("/all-users", fetchAllUsers); // New route to fetch all users
router.put('/users/add-fund', addFundToUserWallet);
router.delete('/users/:id', deleteUserById);

export default router;
