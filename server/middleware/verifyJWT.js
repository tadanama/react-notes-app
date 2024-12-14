import jwt from "jsonwebtoken";

// Middlware to verify incoming request
export function verifyJWT(req, res, next) {
	// Get the authorization header from the request header
	const authHeader = req.headers.Authorization || req.headers.authorization;

	// Return error if there is no authorization header that starts with Bearer
	if (!authHeader.startsWith("Bearer "))
		return res.status(401).json("Unauthorized");

	// Authorization header is in the format of "Bearer <token>"
	// Extract the access token from the string
	const accessToken = authHeader.split(" ")[1];

	// Verify the access token
	jwt.verify(
		accessToken,
		process.env.REFRESH_SECRET_TOKEN,
		(error, decoded) => {
			// Return error if token is invalid
			if (error) return res.status(403).json("Forbidden");

			// Set the dynamic property
			req.userId = decoded.id;
			req.userEmail = decoded.email;
			req.username = decoded.username;

			// Pass the control to the next controller/middleware
			next();
		}
	);
}
