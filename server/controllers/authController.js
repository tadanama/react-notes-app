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
				email: foundUser.rows[0].user_email,
				username: foundUser.rows[0].username,
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
export async function register(req, res) {
	// Get the user registration info from client
	const { email, username, password, confirmPassword } = req.body;

	// Return error if password did not match
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
			res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 30000 });

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
export function refresh(req, res) {
	// Get the cookies from the request object
	const cookies = req.cookies;

	// Return error if no cookie with name 'jwt'
	// Cookie with name 'jwt' is the refresh token
	if (!cookies?.jwt) return res.status(401).json("Unauthorized");

	const refreshToken = cookies.jwt;

	// Verify the refresh token
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (error, decoded) => {
			// If error means the token is invalid or expired
			// Return error
			if (error) return res.status(403).json("Invalid token");

			// Check if the decoded user email payload exist in database
			try {
				const foundUser = await pool.query(
					"SELECT * FROM users WHERE user_email = $1",
					[decoded.email]
				);

				// Return error if user do not exist
				if (foundUser.rowCount === 0)
					return res.status(401).json("Unauthorized");

				// Create new user info to embed as token payload
				const userInfo = {
					id: foundUser.rows[0].user_id,
					email: foundUser.rows[0].user_email,
					username: decodefoundUser.rows[0].username,
				};

				// Generate a new access token and send as json response
				const accessToken = generateAccessToken(userInfo);
				res.json({ accessToken });
			} catch (error) {
				console.log(error);
			}
		}
	);

	//
}

//  Logout controller
export function logout(req, res) {
	// Get cookies from request object
	const cookies = req.cookies;

	// If there is no cookies name 'jwt'
	// Send a 204 no content response
	if (!cookies?.jwt) return res.sendStatus(204);

	// Clear the refresh token cookie
	// Must pass same options when creating cookie
	res.clearCookie("jwt", { httpOnly: true });
}

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
