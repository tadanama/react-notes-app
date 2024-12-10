import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addedNewNotes } from "./notesSlice";

function AddNotesForm() {
	// Let react track the state of the form below
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// Instantiate useDispatch
	const dispatch = useDispatch();

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

	// Dispatch the addedNewNotes async thunk
	function handleCreateNote() {
		if (canCreate) {
			// Create current date in "DD/MM/YYYY" format
			const currentDate = new Date();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();
			const formattedDate = `${day}/${month}/${year}`;

			try {
                // Dispatch the addedNewNotes async thunk
				dispatch(
					addedNewNotes({ id: 400, title, body: content, date: formattedDate })
				).unwrap();

                // Clear the input
				setTitle("");
				setContent("");
			} catch (error) {
				console.log("Error when creating new note:", error);
			}
		}
	}

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
					<button
						disabled={canCreate ? false : true}
						onClick={handleCreateNote}
					>
						Create
					</button>
				</form>
			</div>
		</>
	);
}

export default AddNotesForm;
