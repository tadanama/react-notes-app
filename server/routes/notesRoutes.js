import { Router } from "express";
import {
	getNotes,
	addNewNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController.js";

// Instantiate router
const router = Router();

// Get all notes
router.get("/", getNotes);

router.post("/", addNewNote);

router.put("/:noteId", updateNote);

router.delete("/:noteId", deleteNote);

export default router;
