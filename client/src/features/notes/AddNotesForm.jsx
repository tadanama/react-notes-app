import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { addedNewNotes } from "./notesSlice";

function AddNotesForm() {
	// Let react track the state of the form below
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	// Instantiate useDispatch
	const dispatch = useDispatch();

	// Instantiate useNavigate
	const navigate = useNavigate();

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
			try {
				// Dispatch the addedNewNotes async thunk
				dispatch(addedNewNotes({ title, text })).unwrap();

				// Clear the input
				setTitle("");
				setText("");

				// Navigate back to the notes list
				navigate("/");
			} catch (error) {
				console.log("Error when creating new note:", error);
			}
		}
	}

	return (
		<>
			<form>
				<input
					type="text"
					name="title"
					value={title}
					onChange={handleTitleChange}
					placeholder="Note title..."
				/>
				<textarea
					name="text"
					rows={20}
					value={text}
					onChange={handleTextChange}
					placeholder="Enter note here..."
				></textarea>
				<button
					className={`floating-button ${
						canCreate ? "add-icon" : "disabled-button"
					}`}
					onClick={handleCreateNote}
					disabled={canCreate ? false : true}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</form>
		</>
	);
}

export default AddNotesForm;
