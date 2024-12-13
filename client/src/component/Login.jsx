import React, { useState } from "react";

function Login() {
	// Track email and password state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Handle email input change
	function handleEmailChange(event) {
		const { value } = event.target;

		setEmail(value);
	}

	// Handle password input change
	function handlePasswordChange(event) {
		const { value } = event.target;

		setPassword(value);
	}

	return (
		<>
			<h1 className="auth-h1">Login</h1>
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

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={handlePasswordChange}
				/>

				<br />

				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
