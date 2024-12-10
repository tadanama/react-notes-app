import React, { useState } from "react";

function AddNotesForm() {
	return (
		<>
			<div className="form">
				<h2>New note</h2>
				<form>
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" id="title" />
					<label htmlFor="content">Content:</label>
					<textarea id="content" rows={"10"}/>
					<button>Create</button>
				</form>
			</div>
		</>
	);
}

export default AddNotesForm;
