import React from "react";
import { useSelector } from "react-redux";

import { selectAllNotes, selectError, selectNotesStatus } from "./notesSlice";

function NotesList() {
	const notes = useSelector(selectAllNotes);
	const status = useSelector(selectNotesStatus); // Get status when fetching the notes
	const error = useSelector(selectError); // Get error message if an error has occured

	// const orderedNotes = notes
	// 	.slice()
	// 	.sort((a, b) => b.date.localeCompare(a.date));

    // Render different content based on the state status
	let content;
	if (status === "loading") {
		content = <p>Loading ...</p>;
	} else if (status === "succeeded") {
		content = notes.map((note) => {
			let noteBody;

            // Display only 90 characters of the notes body
			if (note.body.length > 90) {
				noteBody = note.body.substring(0, 90) + "...";
			} else {
				noteBody = note.body;
			}

			return (
				<div className="card" key={note.id}>
					<h3>{note.title}</h3>
					<p>{noteBody}</p>
					<span>{note.date}</span>
				</div>
			);
		});
	} else if (status === "failed") {
		content = <p>{error}</p>;
	}

	return (
		<>
			<h2 className="note-header-h2">Notes</h2>
			<div className="card-container">{content}</div>
		</>
	);
}

export default NotesList;
