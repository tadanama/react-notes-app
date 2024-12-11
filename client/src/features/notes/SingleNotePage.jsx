import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllNotes } from "./notesSlice";

function SingleNotePage() {
	const { noteId } = useParams();
	console.log(noteId);

	const notes = useSelector(selectAllNotes);
	const singleNote = notes.find((note) => note.id === noteId);
	console.log(singleNote);

	if (!singleNote) {
		return <p>Post not found</p>;
	}

	return (
		<>
			<div className="full-note">
				<h3>{singleNote.title}</h3>
				<p>{singleNote.body}</p>
				<Link to={`/note/edit/${singleNote.id}`}>
					<span>Edit</span>
				</Link>
				<span>{singleNote.date}</span>
			</div>
		</>
	);
}

export default SingleNotePage;
