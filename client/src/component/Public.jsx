import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function Public() {
	return (
		<>
			<div className="public-container">
				<div className="public-top">
					<h1>Welcome to Notes App</h1>
					<div className="note-icon">
						<FontAwesomeIcon icon={faNoteSticky} />
					</div>
				</div>
				<div className="public-bottom">
					<button className="login">Log in</button>
					<button className="signup">Sign up</button>
				</div>
			</div>
		</>
	);
}

export default Public;
