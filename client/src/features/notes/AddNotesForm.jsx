import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addedNewNotes } from "./notesSlice";

function AddNotesForm() {
	// Let react track the state of the form below
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	// Instantiate useDispatch
	const dispatch = useDispatch();

	function handleTitleChange(event) {
		// Get the value of the title input text
		const { value } = event.target;

		// Set the title state to the input text value
		setTitle(value);
	}

	function handleTextChange(event) {
		// Get the value of the text textarea
		const { value } = event.target;

		// Set the text state to the textarea value
		setText(value);
	}

	// Check if both title and text are filled in or not
	const canCreate = Boolean(title) && Boolean(text);

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
				dispatch(addedNewNotes({ title, text })).unwrap();

				// Clear the input
				setTitle("");
				setText("");
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
					<label htmlFor="text">Content:</label>
					<textarea
						name="text"
						id="text"
						rows={"10"}
						value={text}
						onChange={handleTextChange}
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
