import React, { useState } from "react";

function AddNotesForm() {
	// Let react track the state of the form below
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	function handleTitleChange(event) {
		// Get the value of the title input text
		const { value } = event.target;

		// Set the title state to the input text value
		setTitle(value);
	}

	function handleContentChange(event) {
		// Get the value of the content textarea
		const { value } = event.target;

		// Set the content state to the textarea value
		setContent(value);
	}

	// Check if both title and content are filled in or not
	const canCreate = Boolean(title) && Boolean(content);

	return (
		<>
			<div className="form">
				<h2>New note</h2>
				<form>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={handleTitleChange}
					/>
					<label htmlFor="content">Content:</label>
					<textarea
						name="content"
						id="content"
						rows={"10"}
						value={content}
						onChange={handleContentChange}
					/>
					<button disabled={canCreate ? false : true}>Create</button>
				</form>
			</div>
		</>
	);
}

export default AddNotesForm;
