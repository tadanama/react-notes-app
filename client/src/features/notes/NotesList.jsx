import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
	selectAllNotes,
	selectError,
	selectNotesStatus,
	deletedNote,
} from "./notesSlice";

function NotesList() {
	const notes = useSelector(selectAllNotes);
	const status = useSelector(selectNotesStatus); // Get status when fetching the notes
	const error = useSelector(selectError); // Get error message if an error has occured

	// Instantiate useDispatch()
	const dispatch = useDispatch();

	// Instantiate useNavigate()
	const navigate = useNavigate();

	// const orderedNotes = notes
	// 	.slice()
	// 	.sort((a, b) => b.date.localeCompare(a.date));

	// Render different content based on the state status
	let content;
	if (status === "loading") {
		content = <p>Loading ...</p>;
	} else if (status === "succeeded") {
		content = notes.map((note) => {
			let noteText;

			// Display only 90 characters of the note text
			if (note.note_text.length > 90) {
				noteText = note.note_text.substring(0, 90) + "...";
			} else {
				noteText = note.note_text;
			}

			return (
				<div className="card" key={note.note_id}>
					<h3>{note.note_title}</h3>
					<p>{noteText}</p>
					<Link to={`/note/${note.note_id}`}>
						<span>View more</span>
					</Link>
					<span>{note.created_date} </span>
					<button onClick={() => handleNoteDelete(note.note_id)}>
						<span>Delete note</span>
					</button>
				</div>
			);
		});
	} else if (status === "failed") {
		content = <p>{error}</p>;
	}

	function handleNoteDelete(noteId) {
		try {
			// Dispatch the delete async thunk
			dispatch(deletedNote({ id: noteId })).unwrap();

			navigate("/");
		} catch (error) {
			console.log("Failed to delete note:", error);
		}
	}

	return (
		<>
			<div className="card-container">{content}</div>
		</>
	);
}

export default NotesList;
