import { pool } from "../db.js";

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
