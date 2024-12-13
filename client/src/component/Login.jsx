import React from "react";

function Login() {
	return (
		<>
			<h1 className="auth-h1">Login</h1>
			<form className="auth-form">
				<label htmlFor="email">Email address</label>
				<input type="email" name="email" id="email" />

				<br />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />

				<br />

				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
