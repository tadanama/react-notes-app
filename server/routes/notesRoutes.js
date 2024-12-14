import { Router } from "express";
import {
	getNotes,
	addNewNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

// Instantiate router
const router = Router();

router.use(verifyJWT);

// Route to get all notes
router.get("/", getNotes);

// Route to add new note
router.post("/", addNewNote);

// Route to update a note
router.put("/:noteId", updateNote);

// Route to delete a note
router.delete("/:noteId", deleteNote);

export default router;
