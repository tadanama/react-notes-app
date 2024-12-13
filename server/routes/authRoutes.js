import express from "express";

const router = express.Router();

// Route for user to login
router.post("/login", (req, res) => {});

// Route to register new user
router.post("/register", (req, res) => {});

// Route to generate refresh the access token
router.get("/refresh", (req, res) => {});

// Route when user logout
router.post("/logout", (req, res) => {});

export default router;
