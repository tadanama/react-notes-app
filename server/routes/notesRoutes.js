import { Router } from "express";
import { getNotes, addNewNote } from "../controllers/notesController.js";

// Instantiate router
const router = Router();

// Get all notes
router.get("/", getNotes);

router.post("/", addNewNote);

export default router;
