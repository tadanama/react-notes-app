import React from "react";

function Signup() {
	return (
		<>
			<h1 className="auth-h1">Sign up</h1>
			<form className="auth-form">
				<label htmlFor="email">Email address</label>
				<input type="email" name="email" id="email" />

				<br />

				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" />

				<br />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />

				<br />

				<label htmlFor="confirm-password">Confirm password</label>
				<input type="password" name="confirm-password" id="confirm-password" />

				<button type="submit">Signup</button>
			</form>
		</>
	);
}

export default Signup;
