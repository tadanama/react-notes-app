import express from "express";
import { login, signup, refresh, logout } from "../controllers/authController";

const router = express.Router();

// Route for user to login
router.post("/login", login);

// Route to register new user
router.post("/register", signup);

// Route to generate refresh the access token
router.get("/refresh", refresh);

// Route when user logout
router.post("/logout", logout);

export default router;
