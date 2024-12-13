import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../db";

// Enable the use of environment variables
dotenv.config();

// Login controller
export async function login(req, res) {
	// Get the credentials sent from the client
	const { email, password } = req.body;

	// Check if the email exist in database
	try {
		const foundUser = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email]
		);

		// If no user email send error
		if (foundUser.rowCount === 0) {
			return res.status(400).json("Invalid EMAIL or password");
		}

		const userHashedPassword = foundUser.rows[0].user_password_hash; // Get user hashed password from database
		const passwordMatch = await bcrypt.compare(password, userHashedPassword); // Check if password match

		if (passwordMatch) {
			// Define user info to embed into the token as payload
			const userInfo = {
				id: foundUser.rows[0].user_id,
				username: foundUser.rows[0].user_username,
				email: foundUser.rows[0].user_email,
			};

			// Get the token from helper function below
			const accessToken = generateAccessToken(userInfo);
			const refreshToken = generateRefreshToken(userInfo);

			// Send refresh token as http only cookie
			// The age of the cookie should match with refresh token
			res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 30000 });

			// Send the access token as json response
			return res.status(201).json({ accessToken });
		} else {
			// Return error if password did not match
			return res.status(400).json("Invalid email or PASSWORD");
		}
	} catch (error) {
		console.log(error);
	}
}

// Signup controller
export async function signup(req, res) {
	// Get the user registration info from client
	const { email, username, password, confirmPassword } = req.body;

	// Check if the password and confirm password matches
	if (password !== confirmPassword)
		return res.status(400).json("Password did not match");

	// Check if email exist in database
	try {
		const foundEmail = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		// Return error if email already exist
		if (foundEmail.rowCount !== 0)
			return res.status(400).json("Invalid EMAIL or password");

		// Encrypt the user password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Add new user to database
		try {
			// Generate new user id
			const id = uuidv4();

			const newUser = await pool.query(
				"INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING user_id, user_email, username",
				[id, email, username, hashedPassword]
			);

			// User info to embed into jwt as payload
			const userInfo = {
				id: newUser.rows[0].user_id,
				email: newUser.rows[0].user_email,
				username: newUser.rows[0].username,
			};

			// Generate access and refresh token
			const accessToken = generateAccessToken(userInfo);
			const refreshToken = generateRefreshToken(userInfo);

			// Send refresh token as httponly cookie
			// Cookie expiration should match with refresh token
			res.cookie("jwt", refreshToken, { maxAge: 30000 });

			// Send access token as json response
			return res.json({ accessToken });
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
}

// Refresh controller
export function refresh(req, res) {}

//  Logout controller
export function logout(req, res) {}

// Helper function to generate access token
function generateAccessToken(payload) {
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "10s",
	});

	return token;
}

// Helper function to generate refresh token
function generateRefreshToken(payload) {
	const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "30s",
	});

	return token;
}
