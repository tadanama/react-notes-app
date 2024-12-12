import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllNotes } from "./notesSlice";

function SingleNotePage() {
	const { noteId } = useParams();
	console.log(noteId);

	const notes = useSelector(selectAllNotes);
	const singleNote = notes.find((note) => note.note_id === noteId);
	console.log(singleNote);

	if (!singleNote) {
		return <p>Post not found</p>;
	}

	return (
		<>
			<div className="full-note">
				<h3>{singleNote.note_title}</h3>
				<p>{singleNote.note_body}</p>
				<Link to={`/note/edit/${singleNote.note_id}`}>
					<span>Edit</span>
				</Link>
				<span>{singleNote.created_date}</span>
			</div>
		</>
	);
}

export default SingleNotePage;
