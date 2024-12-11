import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllNotes } from "./notesSlice";

function EditNoteForm() {
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

	function handleUpdateNote() {}

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
