import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
			let noteTitle;

			// Display only 134 characters of the note text
			if (note.note_text.length > 134) {
				noteText = note.note_text.substring(0, 135) + "...";
			} else {
				noteText = note.note_text;
			}

			// Display only 20 characters of the note title
			if (note.note_title.length > 20) {
				noteTitle = note.note_title.substring(0, 21) + "...";
			} else {
				noteTitle = note.note_title;
			}

			return (
				<div className="card" key={note.note_id}>
					<div className="card-header">
						<Link to={`/note/edit/${note.note_id}`}>
							<h3>{noteTitle}</h3>
						</Link>
						<p>{noteText}</p>
					</div>
					<div className="card-footer">
						<span className="card-date">
							{note.created_date.split("T")[0]}{" "}
						</span>
						<button
							onClick={() => handleNoteDelete(note.note_id)}
							className="delete-icon"
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
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
