import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="header">
			<h1>Notes</h1>
			<nav>
				<ul>
					<Link to={"/note"} style={{ textDecoration: "none" }}>
						<li>Create note</li>
					</Link>
					<Link to={"/"} style={{ textDecoration: "none" }}>
						<li>My notes</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
}

export default Header;
