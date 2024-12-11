import { Router } from "express";
import { getNotes } from "../controllers/notesController.js";

// Instantiate router
const router = Router();

// Get all notes
router.get("/", getNotes);

router.post("/", (req, res) => {
	console.log("You are in /notes/ POST route");
});

export default router;
