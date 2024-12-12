import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes, updatedNote } from "./notesSlice";

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
						disabled={canUpdate ? false : true}
						onClick={handleUpdateNote}
					>
						Update
					</button>
				</form>
			</div>
		</>
	);
}

export default EditNoteForm;
