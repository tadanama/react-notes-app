import React, { useState } from "react";

function Signup() {
	// Track email, username, password and confirm passwords state
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Handle email input change
	function handleEmailChange(event) {
		const { value } = event.target;

		setEmail(value);
	}

	// Handle username input change
	function handleUsernameChange(event) {
		const { value } = event.target;

		setUsername(value);
	}

	// Handle password input change
	function handlePasswordChange(event) {
		const { value } = event.target;

		setPassword(value);
	}

	// Handle confirm password input change
	function handleConfirmPasswordChange(event) {
		const { value } = event.target;

		setConfirmPassword(value);
	}

	return (
		<>
			<h1 className="auth-h1">Sign up</h1>
			<form className="auth-form">
				<label htmlFor="email">Email address</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={handleEmailChange}
				/>

				<br />

				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={handleUsernameChange}
				/>

				<br />

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={handlePasswordChange}
				/>

				<br />

				<label htmlFor="confirm-password">Confirm password</label>
				<input
					type="password"
					name="confirm-password"
					id="confirm-password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
				/>

				<button type="submit">Signup</button>
			</form>
		</>
	);
}

export default Signup;
