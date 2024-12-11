import { Router } from "express";
import {
	getNotes,
	addNewNote,
	updateNote,
} from "../controllers/notesController.js";

// Instantiate router
const router = Router();

// Get all notes
router.get("/", getNotes);

router.post("/", addNewNote);

router.put("/:noteId", updateNote);

export default router;
