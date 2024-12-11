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
	const singleNote = notes.find((note) => note.id === noteId);

	// Define the state for the inputs
	const [title, setTitle] = useState(singleNote.title);
	const [content, setContent] = useState(singleNote.body);

	// Let react manage the state of the inputs
	function handleTitleChange(event) {
		const { value } = event.target;

		setTitle(value);
	}

	function handleContentChange(event) {
		const { value } = event.target;

		setContent(value);
	}

	// Check if both inputs are filled
	const canUpdate = Boolean(title) && Boolean(content);

	function handleUpdateNote(event) {
		event.preventDefault();

		if (canUpdate) {
			try {
				// Create current date in "DD/MM/YYYY" format
				const currentDate = new Date();
				const day = currentDate.getDate();
				const month = currentDate.getMonth() + 1;
				const year = currentDate.getFullYear();
				const formattedDate = `${day}/${month}/${year}`;

				// DIspatch updatedNotes async thunk
				dispatch(
					updatedNote({ id: noteId, title, body: content, date: formattedDate })
				).unwrap();

				// Clear the input
				setTitle("");
				setContent("");

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
					<label htmlFor="content">Content:</label>
					<textarea
						name="content"
						id="content"
						rows={"10"}
						value={content}
						onChange={handleContentChange}
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
