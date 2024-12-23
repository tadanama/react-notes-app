import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

// Get all notes from database
export const getNotes = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM notes");
		console.log(result.rows);

		// Send the all notes from database as response
		return res.json(result.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

// Add a new note
export const addNewNote = async (req, res) => {
	// Get the note title, text and date
	const { title, text, date } = req.body;

	// Generate new id
	const newNoteId = uuidv4();

	// Send POST request
	try {
		const result = await pool.query(
			"INSERT INTO notes (note_id, note_title, note_text, created_date) VALUES ($1, $2, $3, $4) RETURNING *",
			[newNoteId, title, text, date]
		);

		// Send the newly created note
		res.json(result.rows[0]);
	} catch (error) {
		console.log(error);
	}
};

// Update the note
export const updateNote = async (req, res) => {
	// Get the note id from req.params
	const { noteId } = req.params;

	// Get the note info to update
	const { title, text, date } = req.body;

	// Check if the notes that we are trying to update exists
	try {
		const foundNote = await pool.query(
			"SELECT * from notes WHERE note_id = $1",
			[noteId]
		);

		// If there are no rows returned means that the post do not exist
		// Return 204 status code
		if (!foundNote.rows) {
			res.status(400);
			return res.json("Note do not exist");
		}

		// Update the notes to the database
		try {
			const result = await pool.query(
				"UPDATE notes SET note_title = $1, note_text = $2, created_date = $3 WHERE note_id = $4 RETURNING *",
				[title, text, date, noteId]
			);
			res.json(result.rows[0]);
		} catch (error) {
			console.log(error);
		}

		// Check if user provide title or not
	} catch (error) {
		console.log(error);
	}
};

// Delete a note
export const deleteNote = async (req, res) => {
	// Get the note id from req.params
	const { noteId } = req.params;

	// Check if note exist
	try {
		const foundPost = await pool.query(
			"SELECT * FROM notes WHERE note_id = $1",
			[noteId]
		);

		// Return error if note do not exist
		if (!foundPost.rows) {
			res.status(400);
			return res.json("Note do not exist");
		}

		// Delete the note from database
		try {
			const result = await pool.query(
				"DELETE FROM notes WHERE note_id = $1 RETURNING *",
				[noteId]
			);
			res.json(result.rows[0]);
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
};
