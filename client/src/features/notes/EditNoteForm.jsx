import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, updatedNote } from "./notesSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditNoteForm() {
	// Instantiate useDispatch
	const dispatch = useDispatch();

	// Instantiate useNavigate
	const navigate = useNavigate();

	// Get the note id from URL
	const { noteId } = useParams();

	// Retrieve the current note
	const notes = useSelector(selectAllNotes);
	const singleNote = notes.find((note) => note.note_id === noteId);

	// Define the state for the inputs
	const [title, setTitle] = useState(singleNote.note_title);
	const [text, setText] = useState(singleNote.note_text);

	// Let react manage the state of the inputs
	function handleTitleChange(event) {
		const { value } = event.target;

		setTitle(value);
	}

	function handleTextChange(event) {
		const { value } = event.target;

		setText(value);
	}

	// Check if both inputs are filled
	const canUpdate = Boolean(title) && Boolean(text);

	function handleUpdateNote(event) {
		event.preventDefault();

		if (canUpdate) {
			try {
				// Get current local time date in ISO string format
				const date = new Date();
				date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
				const currentDate = date.toISOString().split("Z")[0];

				// Dispatch updatedNotes async thunk
				dispatch(updatedNote({ id: noteId, title, text })).unwrap();

				// Clear the input
				setTitle("");
				setText("");

				// Redirect back to homepage
				navigate("/");
			} catch (error) {
				console.log("Failed to update:", error);
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
						canUpdate ? "edit-icon" : "disabled-button"
					}`}
					onClick={handleUpdateNote}
					disabled={canUpdate ? false : true}
				>
					<FontAwesomeIcon icon={faFloppyDisk} />
				</button>
			</form>
		</>
	);
}

export default EditNoteForm;
