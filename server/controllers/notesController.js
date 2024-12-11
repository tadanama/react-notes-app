import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

// Get all notes from database
export const getNotes = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM notes");
		console.log(result.rows);

		// Send the all notes from database as response
		res.json(result.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export const addNewNote = async (req, res) => {
	// Get the note title and text
	const { title, text } = req.body;

    // Generate new id
	const newNoteId = uuidv4();

    // Send POST request
    //TODO remove the hard coded id when authentication is implemented
	try {
		const result = await pool.query(
			"INSERT INTO notes (note_id, note_title, note_text, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
			[newNoteId, title, text, "1"]
		);

        // Send the newly created note
        res.json(result.rows[0]);
	} catch (error) {
		console.log(error);
	}
};
